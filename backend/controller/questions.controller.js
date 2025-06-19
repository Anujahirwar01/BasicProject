import questionModel from '../models/question.model.js';
import * as questionService from '../services/question.service.js';
import { validationResult } from 'express-validator';


export const AskQuestion = async (req, res) => {
  const questionData = { ...req.body, userPosted: req.userId };

  try {
    await createQuestion(questionData);
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error fetching questions");
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await questionModel.findByIdAndDelete(id);
    res.status(200).json("Question deleted");
  } catch (error) {
    res.status(500).json("Error deleting question");
  }
};
