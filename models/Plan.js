// models\Plan.js
import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    destination: {
      type: String,
      required: [true, "Please provide destination name"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, "Please provide a subtitle"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    days: {
      type: Number,
      required: [true, "Please provide number of days"],
      min: [1, "Days must be at least 1"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
      trim: true,
    },

    // Metadata for SEO
    meta: {
      title: {
        type: String,
        trim: true,
        default: function () {
          return `${this.destination} ${this.days}-Day Travel Plan - Wanderlust`;
        },
      },
      description: {
        type: String,
        trim: true,
        default: function () {
          return `Complete ${this.days}-day itinerary for ${this.destination} including must-see attractions, travel tips, and budget planning.`;
        },
      },
    },

    // Highlights section
    highlights: [
      {
        title: {
          type: String,
          required: [true, "Please provide highlight title"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Please provide highlight description"],
          trim: true,
        },
        icon: {
          type: String,
          trim: true,
          default: "📍",
        },
        category: {
          type: String,
          enum: [
            "attraction",
            "museum",
            "palace",
            "food",
            "tip",
            "budget",
            "transport",
            "nature",
            "beach",
            "shopping",
            "experience",
            "culture",
          ],
          default: "attraction",
        },
        rating: {
          type: String,
          trim: true,
        },
      },
    ],

    // Itinerary with exact structure
    itinerary: [
      {
        day: {
          type: Number,
          required: [true, "Please provide day number"],
          min: [1, "Day must be at least 1"],
        },
        title: {
          type: String,
          required: [true, "Please provide day title"],
          trim: true,
        },
        imageUrl: {
          type: String,
          trim: true,
        },
        activities: [
          {
            time: {
              type: String,
              required: [true, "Please provide activity time"],
              trim: true,
            },
            title: {
              type: String,
              required: [true, "Please provide activity title"],
              trim: true,
            },
            description: {
              type: String,
              trim: true,
            },
          },
        ],
      },
    ],

    // Travel tips section
    // tips: [
    //   {
    //     title: {
    //       type: String,
    //       required: [true, "Please provide tip title"],
    //       trim: true,
    //     },
    //     description: {
    //       type: String,
    //       required: [true, "Please provide tip description"],
    //       trim: true,
    //     },
    //     category: {
    //       type: String,
    //       enum: [
    //         "transportation",
    //         "food",
    //         "safety",
    //         "money",
    //         "culture",
    //         "packing",
    //         "shopping",
    //         "general"
    //       ],
    //       default: "safety",
    //     },
    //   },
    // ],

    // Budget information
    budget: {
      type: Map,
      of: String,
    },

    // Additional information
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    climate: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
      default: "English",
    },
    currency: {
      type: String,
      trim: true,
      default: "USD",
    },

    // Additional data from creation
    travelers: {
      type: Number,
      default: 1,
    },
    budgetLevel: {
      type: String,
      trim: true,
      default: "moderate",
    },
    createdFromPrompt: {
      type: String,
      trim: true,
    },
    preferences: [String],
    interests: [String],

    // Statistics
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },

    // Creator information
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Status
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Add indexes for better query performance
// Remove duplicate index for slug (slug already has unique: true in schema)
PlanSchema.index({ destination: 1 });
PlanSchema.index({ isPublished: 1, isFeatured: 1 });
PlanSchema.index({ "highlights.category": 1 });
PlanSchema.index({ createdAt: -1 }); // For sorting by latest

// Virtual for full destination title
PlanSchema.virtual("fullTitle").get(function () {
  return `${this.destination}: ${this.title} - ${this.subtitle}`;
});

// Virtual for itinerary sorted by day
PlanSchema.virtual("sortedItinerary").get(function () {
  return this.itinerary.sort((a, b) => a.day - b.day);
});

// Static method to find by slug
PlanSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug, isPublished: true });
};

// Static method to get featured plans
PlanSchema.statics.getFeatured = function (limit = 6) {
  return this.find({ isPublished: true, isFeatured: true })
    .limit(limit)
    .sort({ createdAt: -1 });
};

// Static method to get popular plans
PlanSchema.statics.getPopular = function (limit = 6) {
  return this.find({ isPublished: true })
    .limit(limit)
    .sort({ views: -1, createdAt: -1 });
};

// Static method to increment views
PlanSchema.statics.incrementViews = async function (slug) {
  return this.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true });
};

// Static method to increment shares
PlanSchema.statics.incrementShares = async function (slug) {
  return this.findOneAndUpdate(
    { slug },
    { $inc: { shares: 1 } },
    { new: true },
  );
};

// Pre-save middleware to ensure slug is unique and formatted
PlanSchema.pre("save", async function () {
  if (this.isModified("slug")) {
    // Ensure slug is lowercase and trimmed
    this.slug = this.slug.toLowerCase().trim();

    // Check for existing slug (excluding current document)
    const existingPlan = await mongoose.models.Plan?.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    });

    if (existingPlan) {
      const error = new Error("Slug already exists");
      error.name = "ValidationError";
      throw error;
    }
  }
});

// Pre-findOneAndUpdate middleware for increment operations
PlanSchema.pre("findOneAndUpdate", function (next) {
  // For increment operations, bypass slug validation
  if (this._update.$inc) {
    return next();
  }
  next();
});

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
