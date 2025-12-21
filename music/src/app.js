import express from 'express';
import musicRouter from './routes/music.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/music', musicRouter);





export default app;