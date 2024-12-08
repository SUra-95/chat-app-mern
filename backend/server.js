import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import protectRoutes from '../backend/middleware/protectRoutes.js'
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from req.cookie

app.use('/api/auth', authRoutes);
app.use('/api/messages', protectRoutes, messageRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello, world!!!!!!!!!!!!!!!!!!!!!!!!');
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});