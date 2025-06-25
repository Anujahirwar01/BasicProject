import { Router } from 'express';
import * as userController from '../controller/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// REGISTER
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.createUserController
);

// LOGIN
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required'),
  ],
  userController.loginUserController
);

// UPDATE USER (Protected)
router.put('/:id', authMiddleware.authMiddleware, userController.updateUserController);

// GET ALL USERS
router.get("/", userController.getAllUsersController);

// ✅ STATIC ROUTES FIRST
router.get('/profile', authMiddleware.authMiddleware, userController.getUserProfileController);
router.get('/logout', userController.logoutUserController);

// ✅ DYNAMIC ROUTE LAST
router.get('/:id', userController.getUserByIdController);

export default router;
