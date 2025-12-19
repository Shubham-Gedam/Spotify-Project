import express from 'express';
import sendEmail from './utils/email.js';

const app = express();

sendEmail("shubhamgedam652@gmail.com", "Test Email", "This is a test email.", "<h1>This is a test email.</h1>")



export default app;