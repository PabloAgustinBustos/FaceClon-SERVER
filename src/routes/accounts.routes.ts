import { Router } from "express"
import { getAccounts } from "../controllers/accounts"

const accountsRouter = Router()

accountsRouter.get("/", getAccounts)

export default accountsRouter