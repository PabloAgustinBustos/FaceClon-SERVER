import { Router } from "express"
import { createAccount, getAccounts } from "../controllers/accounts"

const accountsRouter = Router()

accountsRouter.get("/", getAccounts)
accountsRouter.post("/", createAccount)

export default accountsRouter