import express, { Request, Response } from "express"
import cors from "cors"
import accountsRouter from "./routes/accounts.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to faceclon server")
})

app.use("/api/v1/accounts", accountsRouter)

export default app