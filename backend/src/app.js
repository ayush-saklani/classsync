import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mongosanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5500",
            "https://classsync.vercel.app",
            "https://gehutimetable.vercel.app",
            "https://projectclasssync.vercel.app",
            "https://navit.vercel.app",
            "capacitor://localhost"             // ✅ Mobile app origin (Capacitor)
        ],
        credentials: true,
    })
);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json({ limit: "4MB" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(mongosanitize());
app.use(routes);

export { app };
