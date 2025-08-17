import { Router } from "express"
import { login, logout, signUp } from "../controllers/auth.controller"
import { checkLoginDTO, checkSignUpDTO } from "../middlewares/auth.middleware"

const authRouter = Router()

authRouter.post("/register", checkSignUpDTO, signUp)
authRouter.post("/login", checkLoginDTO, login)
authRouter.post('/logout', logout)

export default authRouter