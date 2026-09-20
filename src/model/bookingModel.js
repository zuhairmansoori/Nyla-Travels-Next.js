import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────
    // User
    // ─────────────────────────────────────
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
      index: true,
    },

    // ─────────────────────────────────────
    // Booking Reference
    // ─────────────────────────────────────
    bookingNumber: {
      type: String,
      unique: true,
      index: true,
    },

    // ─────────────────────────────────────
    // Booking Type
    // ─────────────────────────────────────
    bookingType: {
      type: String,
      enum: ["package", "visa", "car"],
      required: true,
      index: true,
    },

    // ID of Package / Visa / Car
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // ─────────────────────────────────────
    // Customer Snapshot
    // ─────────────────────────────────────
    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // ─────────────────────────────────────
    // Booking Details
    // ─────────────────────────────────────
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // ─────────────────────────────────────
    // Price
    // ─────────────────────────────────────
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },

      tax: {
        type: Number,
        default: 0,
        min: 0,
      },

      discount: {
        type: Number,
        default: 0,
        min: 0,
      },

      total: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
        uppercase: true,
      },
    },

    // ─────────────────────────────────────
    // Payment
    // ─────────────────────────────────────
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "cash", "bank_transfer", "other"],
    },

    razorpay: {
      orderId: {
        type: String,
        unique: true,
        sparse: true,
      },

      paymentId: {
        type: String,
        unique: true,
        sparse: true,
      },

      signature: {
        type: String,
      },
    },

    // ─────────────────────────────────────
    // Booking Status
    // ─────────────────────────────────────
    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
      index: true,
    },

    // ─────────────────────────────────────
    // Cancellation
    // ─────────────────────────────────────
    cancellation: {
      cancelledAt: Date,

      reason: {
        type: String,
        trim: true,
      },

      refundAmount: {
        type: Number,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// ─────────────────────────────────────────
// Booking Number
// ─────────────────────────────────────────
bookingSchema.pre("save",  function (next) {
  if (!this.bookingNumber) {
    const random = Math.floor(100000 + Math.random() * 900000);

    this.bookingNumber = `NYL-${new Date().getFullYear()}-${random}`;
  }


});

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

export default Booking;