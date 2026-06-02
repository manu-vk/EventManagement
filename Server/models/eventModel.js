import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    price: {
      type: Number,
      default: 0
    },

    capacity: {
      type: Number,
      required: true
    },

    image: {
    type: String,
    required: true
}
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);