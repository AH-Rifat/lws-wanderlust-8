// app\api\generate-travel\route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Plan from "@/models/Plan";
import { generateTravelPlan } from "@/lib/geminiService";
import { getDestinationImage } from "@/lib/unsplashService";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function POST(request) {
  await dbConnect();

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Check if prompt is travel-related
    const isTravelRelated = await generateTravelPlan(
      `Is this about travel or vacation planning? Respond only "yes" or "no". Prompt: "${prompt}"`,
    );

    if (isTravelRelated?.toLowerCase()?.includes("no")) {
      return NextResponse.json(
        { error: "Please provide a travel-related prompt" },
        { status: 400 },
      );
    }

    // Extract destination using AI for better accuracy
    const destinationPrompt = `Extract the primary destination (city or country) from this prompt. Respond with only the destination name, and nothing else. For example, if the prompt is "A 10-day trip to see the Eiffel Tower and the Louvre", you should respond with "Paris". Prompt: "${prompt}"`;
    const destination = (await generateTravelPlan(destinationPrompt)).trim();

    // Extract days using AI
    const daysPrompt = `Extract the number of days for the trip from this prompt. Respond with only the number, and nothing else. For example, if the prompt is "A 10-day trip to Paris", you should respond with "10". If no number is specified, respond with "7". Prompt: "${prompt}"`;
    const daysResponse = (await generateTravelPlan(daysPrompt)).trim();
    const days = parseInt(daysResponse, 10) || 5; // Default to 5 days if not specified

    const travelerCount = 2; // Default to 2 travelers
    const budgetLevel = "moderate"; // Default to moderate
    const preferences = [];
    const interests = [];

    const slug = `${slugify(destination)}-tour-${days}-days`;

    // Check if a plan with this exact destination and days exists
    let plan = await Plan.findOne({
      destination: new RegExp(`^${destination}$`, "i"), // Exact match, case-insensitive
      days: days,
    });

    if (plan) {
      return NextResponse.json({
        success: true,
        plan: plan,
        message: "Found existing travel plan",
      });
    }

    // Create enhanced prompt for AI
    const travelPrompt = `
You are a travel planner. Create a detailed, day-by-day travel plan in a valid JSON format.

**Requirements:**
- Destination: ${destination}
- Duration: ${days} days
- Travelers: ${travelerCount}
- Budget: ${budgetLevel}
- Preferences: ${preferences?.join(", ") || "not specified"}
- Interests: ${interests?.join(", ") || "not specified"}
- User's prompt: "${prompt}"

**JSON Structure:**
{
  "destination": "${destination}",
  "title": "Paris Adventure",
  "subtitle": "A ${days}-day journey through the heart of France",
  "description": "Experience the best of ${destination} with our curated plan, from iconic landmarks to hidden gems.",
  "days": ${days},
  "highlights": [
    {"title": "Eiffel Tower", "description": "Iconic landmark with breathtaking views.", "icon": "📍", "category": "attraction", "rating": "4.8"},
    {"title": "Louvre Museum", "description": "Home to the Mona Lisa.", "icon": "🏛️", "category": "museum"},
    {"title": "French Cuisine", "description": "Enjoy croissants, macarons, and classic French dishes.", "icon": "🍜", "category": "food"},
    {"title": "Seine River Cruise", "description": "A relaxing cruise with beautiful city views.", "icon": "🚢", "category": "experience"}
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival and City Exploration",
      "activities": [
        {"time": "09:00", "title": "Visit the Eiffel Tower", "description": "Book tickets in advance to avoid long queues."},
        {"time": "13:00", "title": "Lunch at a local bistro", "description": "Enjoy a classic French meal."},
        {"time": "15:00", "title": "Explore Montmartre", "description": "Wander through the charming streets and visit the Sacré-Cœur."}
      ]
    }
  ],
  "tips": [
    {"title": "Use Public Transport", "description": "The metro is an efficient way to get around the city.", "category": "transportation"},
    {"title": "Learn Basic French Phrases", "description": "'Bonjour' and 'merci' go a long way.", "category": "culture"}
  ],
  "budget": {
    "Accommodation": "150-300 USD per night",
    "Food": "80-150 USD per day",
    "Transport": "20-40 USD per day",
    "Attractions": "50-100 USD per day"
  },
  "bestTimeToVisit": "Spring (April-June) or Fall (September-October)",
  "climate": "Moderate with four distinct seasons",
  "language": "French",
  "currency": "Euro (EUR)"
}

**Guidelines:**
1.  Generate a complete itinerary for all **${days}** days.
2.  Ensure highlights are diverse and practical for a tourist.
3.  Use realistic timings for activities.
4.  The budget should be appropriate for a **${budgetLevel}** budget level.
5.  Include specific, actionable tips for visiting **${destination}**.
6.  Keep all descriptions engaging but concise.
7.  The "category" for each highlight must be one of: "attraction", "museum", "palace", "food", "tip", "budget", "transport", "nature", "beach", "shopping", "experience", "culture".
8.  Return **only** the JSON object, with no extra text or explanations.
`;

    // Generate travel plan using AI
    const travelPlanText = await generateTravelPlan(travelPrompt);

    // Extract JSON from response
    let travelPlan;
    try {
      // Try to parse directly
      travelPlan = JSON.parse(travelPlanText);
    } catch (parseError) {
      // Extract JSON from text if wrapped
      const jsonMatch = travelPlanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        travelPlan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    // Get image for destination
    let imageUrl;
    try {
      imageUrl = await getDestinationImage(travelPlan.destination);
    } catch (imageError) {
      console.warn("Could not fetch image, using fallback:", imageError);
      // Fallback image
      imageUrl =
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop";
    }

    // Create complete plan data
    const planData = {
      ...travelPlan,
      slug: slug,
      imageUrl: imageUrl,
      meta: {
        title: `${travelPlan.destination} ${travelPlan.days}-Day Travel Plan`,
        description: `Complete ${travelPlan.days}-day itinerary for ${travelPlan.destination} with highlights, itinerary, and travel tips.`,
      },
      travelers: travelerCount,
      budgetLevel: budgetLevel,
      views: 0,
      shares: 0,
      isPublished: true,
      isFeatured: false,
      createdFromPrompt: prompt,
    };

    // Add preferences and interests if provided and not empty
    if (preferences && preferences.length > 0) {
      planData.preferences = preferences;
    }
    if (interests && interests.length > 0) {
      planData.interests = interests;
    }

    // Save to database
    plan = await Plan.create(planData);

    return NextResponse.json({
      success: true,
      plan: plan,
      message: "Travel plan generated successfully",
    });
  } catch (error) {
    console.error("Error generating travel plan:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "An error occurred while generating the travel plan.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to search existing plans
export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const days = searchParams.get("days");

    let query = { isPublished: true };

    if (destination) {
      query.destination = new RegExp(destination, "i");
    }

    if (days) {
      query.days = parseInt(days);
    }

    const plans = await Plan.find(query).sort({ createdAt: -1 }).limit(30);

    return NextResponse.json({
      success: true,
      plans: plans,
      count: plans.length,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);

    return NextResponse.json(
      { error: "Failed to fetch travel plans" },
      { status: 500 },
    );
  }
}
