# Wanderlust

Wanderlust is an AI-powered travel planning application. Users can describe their dream trip, and the application will generate a detailed itinerary, including logistics, hotels, and hidden gems. The application uses the Gemini API to generate travel plans and the Unsplash API to fetch destination images.

## Product Features

- **AI-powered travel plan generation:** Describe your dream trip and get a detailed itinerary.
- **View and share travel plans:** Share your generated travel plans with friends and family.
- **Recent travel plans:** See a list of recently generated travel plans on the homepage.
- **Responsive design:** The application is optimized for both desktop and mobile devices.

## Tech Stack with Version

- **Next.js:** 14.2.35
- **React:** 18
- **Mongoose:** 9.1.4
- **@google/genai:** 1.38.0
- **unsplash-js:** 7.0.20
- **Tailwind CSS:** 3.4.1
- **lucide-react:** 0.562.0

## Running Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Learn-with-Sumit/batch-4-assignment-8-wanderlust-AH-Rifat.git
    cd wanderlust
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add the following variables:

    ```
    GEMINI_API_KEY=your_gemini_api_key
    UNSPLASH_ACCESS_KEY=your_unsplash_access_key
    MONGODB_URI=your_mongodb_uri
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Component Tree Structure

```
components/
├── FacebookSDK.jsx
├── PromptForm.jsx
└── ShareButton.jsx
```

## Live Demo Link

[Link to Live Demo](https://lws-wanderlust.netlify.app)
