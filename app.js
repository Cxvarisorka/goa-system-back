import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';

import userRoutes from './routes/user.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://goa-system-gg1hsmxjg-cxvarisorkas-projects.vercel.app"]
}));

// Routes
app.use('/api/users', userRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected...');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch(err => console.error(`Connection to mongoDB error: ${err}`));