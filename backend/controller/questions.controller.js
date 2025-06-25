// controller/questions.controller.js
import questionModel from '../model/question.model.js';
import * as questionService from '../service/questions.service.js';
import { validationResult } from 'express-validator';

export const AskQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const questionData = {
    ...req.body,
    userPosted: req.userId, // coming from authMiddleware
  };

  try {
    const question = await questionService.createQuestion(questionData);
    res.status(201).json({ message: 'Posted successfully', question });
  } catch (error) {
    console.error("AskQuestion Error:", error);
    res.status(500).json({ error: "Couldn't post a new question" });
  }
};

// controller/questions.controller.js
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find().sort({ askedOn: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching questions" });
  }
};

