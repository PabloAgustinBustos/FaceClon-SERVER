import { Router } from "express"
import { login, signUp } from "../controllers/auth.controller"
import { checkLoginDTO, checkSignUpDTO } from "../middlewares/auth.middleware"

const authRouter = Router()

authRouter.post("/register", checkSignUpDTO, signUp)
authRouter.post("/login", checkLoginDTO, login)

export default authRouter