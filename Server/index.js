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
// For development - allow all origins
const corsOptions = {
    origin: function (origin, callback) {
        // Allow all origins for now
        // In production, you should replace this with your actual frontend URLs
        callback(null, true);
        
        // For production, you can use something like this:
        /*
        const allowedOrigins = [
            'http://localhost:5173',
            'https://job-portal-theta-beryl.vercel.app',
            'https://job-portal-git-main-ahmadraza993432-gmailcoms-projects.vercel.app',
            'https://job-portal-ahmadraza993432-gmailcom.vercel.app',
            'https://job-portal.vercel.app',
            /^\.*vercel\.app$/,  // All vercel subdomains
            /^https?:\/\/localhost(:\d+)?$/  // All localhost ports
        ];
        
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.some(pattern => {
            if (typeof pattern === 'string') {
                return origin === pattern || 
                       origin.startsWith(pattern.replace('https://', 'http://'));
            } else if (pattern instanceof RegExp) {
                return pattern.test(origin);
            }
            return false;
        })) {
            return callback(null, true);
        }
        
        console.log('Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
        */
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-access-token'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar', 'Authorization', 'x-access-token'],
    optionsSuccessStatus: 200
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
