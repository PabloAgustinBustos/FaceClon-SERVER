import { Router } from "express"
import { getMe, login, logout, signUp } from "../controllers/auth.controller"
import { checkLoginDTO, checkSignUpDTO, checkUser } from "../middlewares/auth.middleware"

const authRouter = Router()

authRouter.get("/me", checkUser, getMe)
authRouter.post("/register", checkSignUpDTO, signUp)
authRouter.post("/login", checkLoginDTO, login)
authRouter.post('/logout', logout)

export default authRouter