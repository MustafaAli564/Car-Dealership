import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import interactionRouter from './routes/interaction.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import internal from 'stream';
dotenv.config();

mongoose
  // .connect("mongodb+srv://mashhood:mashhood@mern-estate.qbgbhfr.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate")
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(8080, () => {
  console.log('Server is running on port 8080!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/interaction', interactionRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
})



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});