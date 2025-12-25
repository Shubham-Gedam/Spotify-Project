import express from 'express';
import musicRouter from './routes/music.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/music', musicRouter);





export default app;