import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();


// Connect to the database
connectDB();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware for CORS
// import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // ✅ Vite dev server default port
  credentials: true,
}));

// Middleware for cookie parsing
app.use(cookieParser());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
export default app;