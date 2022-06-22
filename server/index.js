import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from './routes/user.js';
import roleRoutes from './routes/role.js';
import resourceRoutes from './routes/resource.js';
import consultationRoutes from './routes/consultation.js';
import pageRoutes from './routes/page.js';
import visitorRoutes from './routes/visitor.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/resources', resourceRoutes);
app.use('/consultations', consultationRoutes);
app.use('/pages', pageRoutes);
app.use('/visitors', visitorRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));
