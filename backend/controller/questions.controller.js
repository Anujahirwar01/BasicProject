import questionModel from '../model/question.model.js';
import * as questionService from '../service/questions.service.js';
import { validationResult } from 'express-validator';

// Ask a new question
export const AskQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const questionData = {
    ...req.body,
    userPosted: req.userId,
  };

  try {
    const question = await questionService.createQuestion(questionData);
    res.status(201).json({ message: 'Posted successfully', question });
  } catch (error) {
    console.error("AskQuestion Error:", error);
    res.status(500).json({ error: "Couldn't post a new question" });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find().sort({ askedOn: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching questions" });
  }
};

// Get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching question with ID:", id);

    const question = await questionModel.findById(id).populate("userPosted");

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Upvote question
export const upvoteQuestion = async (req, res) => {
  try {
    const question = await questionModel.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const userId = req.userId;

    if (!question.upvotes.includes(userId)) {
      question.upvotes.push(userId);
      await question.save();
    }

    res.status(200).json({ message: "Upvoted successfully", upVotes: question.upvotes.length });
  } catch (err) {
    console.error("Upvote Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Post an answer to a question
export const postAnswer = async (req, res) => {
  const { answerText } = req.body;

  try {
    const question = await questionModel.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const newAnswer = {
      answerBody: answerText,
      userAnswered: req.user.name || req.user.email || "User",
      userId: req.userId,
      answeredOn: new Date()
    };

    question.answer.push(newAnswer);
    question.noOfAnswers = question.answer.length;
    await question.save();

    res.status(201).json({ message: "Answer added", answers: question.answer });
  } catch (err) {
    console.error("Post Answer Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// controller/questions.controller.js
// import questionModel from '../model/question.model.js';

export const deleteAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;
  const userId = req.userId;

  console.log("🔍 Delete request received:", { questionId, answerId, userId });

  try {
    const question = await questionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const answer = question.answer.id(answerId);
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    if (answer.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this answer' });
    }

    // ✅ Remove answer subdocument
    answer.deleteOne();

    // ✅ Save updated question
    question.noOfAnswers = question.answer.length - 1;
    await question.save();

    console.log("✅ Answer deleted successfully");
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    console.error("🔥 Error in deleteAnswer:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

