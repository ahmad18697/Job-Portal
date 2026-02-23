import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicantionRouter from "./routes/application.routes.js";
dotenv.config({});

// Fail-Fast: Environment Variable Validation
const requiredEnvVariables = ["PORT", "MONGODB_URI", "SECRET_KEY"];
for (const envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
        console.error(`FATAL ERROR: Environment variable ${envVar} is missing. Shutting down...`);
        process.exit(1);
    }
}

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

const app = express();

connectDB();

// Security Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));

// Rate Limiting for Auth Routes to prevent Brute Force Attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50, // Limit each IP to 50 requests per window
    message: "Too many login/signup attempts from this IP, please try again after 15 minutes."
});

app.get("/", (req, res) => {
    res.send("Welcome to the robust RESTful API API");
})

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", authLimiter, userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicantionRouter);


const server = app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
