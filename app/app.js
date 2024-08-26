import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/user.route.js";

// db connect
dbConnect();
const app = express()


// routes
app.use('/',userRoutes)
export default app;