import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware"

const usersRouter = Router()

usersRouter.use(checkUser)

usersRouter.get("/friend-requests", () => {})
usersRouter.post("/friend-requests/:receiverID", () => {})
usersRouter.patch("/friend-requests/:senderID", () => {})
usersRouter.get("/friends", () => {})

export default usersRouter