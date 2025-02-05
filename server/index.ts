import express from 'express';
import "dotenv/config";
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
const server = http.createServer(app);
const {PORT} = process.env || 4000;

app.use(cors());

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});