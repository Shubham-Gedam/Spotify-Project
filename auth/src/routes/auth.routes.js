import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as validatonRule from '../middlewares/validation.middleware.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', validatonRule.registrationValidationRules, authController.register);

router.post('/login', validatonRule.loginValidationRules, authController.login);


// Route to initiate Google OAuth flow
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
    authController.googleAuthCallback
);

export default router;