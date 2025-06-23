import {Router} from 'express';
import * as userController from '../controller/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post(
  '/register',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),

    body('email')
      .isEmail()
      .withMessage('Invalid email address'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userController.createUserController
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required')
], userController.loginUserController);

// routes/user.routes.js
router.get("/", userController.getAllUsersController);

router.get('/:id', userController.getUserByIdController);

router.put('/users/:id', authMiddleware.authMiddleware, userController.updateUserController);


router.get('/profile', authMiddleware.authMiddleware, userController.getUserProfileController);

router.get('/logout',userController.logoutUserController);

export default router;