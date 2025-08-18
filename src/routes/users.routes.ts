import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware"
import { sendFriendRequest, takeDecision } from "../controllers/users.controller"
import { checkTakeDecisionDTO } from "../middlewares/users.middleware"

const usersRouter = Router()

usersRouter.use(checkUser)

usersRouter.get("/friend-requests", () => {})
usersRouter.post("/friend-requests/:receiverID", sendFriendRequest)
usersRouter.patch("/friend-requests/:senderID", checkTakeDecisionDTO, takeDecision)
usersRouter.get("/friends", () => {})

export default usersRouter