// services/question.service.js
import questionModel from '../model/question.model.js';

export const createQuestion = async (data) => {
  const question = new questionModel(data);
  return await question.save();
};
