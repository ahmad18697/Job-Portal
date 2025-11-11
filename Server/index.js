import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicantionRouter from "./routes/application.routes.js";
dotenv.config({});

const app = express();

connectDB()

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:5173',
    'https://job-portal-theta-beryl.vercel.app',
    'https://job-portal-git-main-ahmadraza993432-gmailcoms-projects.vercel.app',
    'https://job-portal-ahmadraza993432-gmailcom.vercel.app',
    'https://job-portal.vercel.app',
    'https://job-portal-*.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin matches any of the allowed patterns
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // For wildcard domains
            if (allowedOrigin.includes('*')) {
                const regex = new RegExp(allowedOrigin.replace('*', '.*'));
                return regex.test(origin);
            }
            return origin === allowedOrigin || 
                   origin.startsWith(allowedOrigin.replace('https://', 'http://'));
        });
        
        if (isAllowed) {
            return callback(null, true);
        }
        
        console.log('Blocked by CORS:', origin);
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar', 'Authorization'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicantionRouter);


app.listen(PORT, () => {
    
    console.log(`Server running at port ${PORT}`);
})
