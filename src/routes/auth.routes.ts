import { Router } from "express"
import { signUp } from "../controllers/auth.controller"
import { checkSignUpDTO } from "../middlewares/auth.middleware"

const authRouter = Router()

authRouter.post("", checkSignUpDTO, signUp)

export default authRouter