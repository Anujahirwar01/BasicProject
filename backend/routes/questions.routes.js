import {Router} from 'express';
import * as questionController from '../controller/questions.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';


const router = Router();

router.post('/AskQuestion', 
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('tags').isArray().withMessage('Tags required')
    ],
    authMiddleware.authMiddleware,
    questionController.createQuestionController
)