import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware"
import { getFriendRequests, getFriends, getUsers, sendFriendRequest, takeDecision } from "../controllers/users.controller"
import { checkTakeDecisionDTO } from "../middlewares/users.middleware"

const usersRouter = Router()

usersRouter.use(checkUser)

usersRouter.get("/", getUsers)
usersRouter.get("/friend-requests", getFriendRequests)
usersRouter.post("/friend-requests/:receiverID", sendFriendRequest)
usersRouter.patch("/friend-requests/:senderID", checkTakeDecisionDTO, takeDecision)
usersRouter.get("/friends", getFriends)

export default usersRouter