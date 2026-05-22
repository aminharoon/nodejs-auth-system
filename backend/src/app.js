import express from "express";
import morgan from "morgan"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";


const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth", authRouter)


app.use(errorMiddleware)

export default app