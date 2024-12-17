import { Request, Response } from "express";
import * as Account from "../services/account"

export const getAccounts = async(request: Request, response: Response) => {
    response.status(200).json({
        amount: Account.getAmount(),
        accounts: Account.getAccounts()
    })
}