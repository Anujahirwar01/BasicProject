import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  answerBody: { type: String, required: true },
  userAnswered: { type: String, required: true }, // Name or ID of the user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answeredOn: {
    type: Date,
    default: Date.now,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Question title is required"],
  },
  description: {
    type: String,
    required: [true, "Question description is required"],
  },
  tags: {
    type: [String],
    required: [true, "At least one tag is required"],
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId], // Array of user IDs
    ref: "User",
    default: [],
  },
  downvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  userPosted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  askedOn: {
    type: Date,
    default: Date.now,
  },
  answer: [answerSchema], // Embedded answers
}, {
  timestamps: true // Automatically add createdAt, updatedAt
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
