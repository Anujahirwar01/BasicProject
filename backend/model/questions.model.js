import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    noOfAnswers: {
        type: Number,
        default: 0,
    },
    upvotes: {
        type: [String],
        default: [],
    },
    downvotes: {
        type: [String],
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
    answer: [
    {
      answerBody: String,
      userAnswered: String,
      userId: String,
      answeredOn: { type: Date, default: Date.now },
    },
  ],
    });

const Question = mongoose.model("Question", questionSchema);
export default Question;