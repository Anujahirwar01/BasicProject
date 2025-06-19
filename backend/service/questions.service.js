// services/question.service.js
import questionModel from '../models/question.model.js';

export const createQuestion = async (questionData) => {
  const question = new questionModel(questionData);
  return await question.save();
};
