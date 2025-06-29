import { Router } from 'express';
import * as questionController from '../controller/questions.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// POST /questions/AskQuestion
router.post(
  '/AskQuestion',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('tags').isArray().withMessage('Tags required'),
  ],
  authMiddleware.authMiddleware,
  questionController.AskQuestion
);

router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.post("/:id/upvote", authMiddleware.authMiddleware, questionController.upvoteQuestion);
router.post("/:id/answer", authMiddleware.authMiddleware, questionController.postAnswer);

// ✅ New DELETE route for removing an answer (only by owner)
router.delete(
  "/:questionId/answer/:answerId",
  authMiddleware.authMiddleware,
  questionController.deleteAnswer
);


export default router;
