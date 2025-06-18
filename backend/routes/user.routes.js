import {Router} from 'express';
import * as userController from '../controller/user.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.createUserController);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required')
], userController.loginUserController);

export default router;