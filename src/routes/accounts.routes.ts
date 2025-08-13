import { Router } from "express"
import { createAccount, getAccounts } from "../controllers/accounts.controller"

const accountsRouter = Router()

accountsRouter.get("/", getAccounts)
accountsRouter.post("/", createAccount)

export default accountsRouter