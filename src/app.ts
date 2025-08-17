import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import accountsRouter from "./routes/accounts.routes"
import authRouter from "./routes/auth.routes"
import usersRouter from "./routes/users.routes"

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to faceclon server")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/accounts", accountsRouter)
app.use("/api/v1/users", usersRouter)

export default app