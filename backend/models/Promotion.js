const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema(
  {
    promotionId: {
      type: String,
      unique: true,
      required: true
    },

    promotionName: {
      type: String,
      required: true,
      trim: true
    },

    discountType: {
      type: String,
      enum: ['Percentage', 'Fixed Amount'],
      required: true
    },

    discountValue: {
      type: Number,
      required: true
    },

    minimumOrderValue: {
      type: Number,
      required: true
    },

    eligibleProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    scheduledDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ['Active', 'Scheduled', 'Expired'],
      default: 'Scheduled'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Promotion', promotionSchema);