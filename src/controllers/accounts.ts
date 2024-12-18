import { Request, Response } from "express";
import * as Account from "../services/account"

export const getAccounts = async(request: Request, response: Response) => {
    const accounts = await Account.getAccounts()

    response.status(200).json({
        amount: accounts.length,
        accounts
    })
}

type CreateAccountDTO = {
    email: string
    password: string
}
export const createAccount = async(request: Request<{},{},CreateAccountDTO>, response: Response) => {
    const { email, password } = request.body

    const missing = []

    if (!email) missing.push("email")
    if (!password) missing.push("password")
    
    if (missing.length > 0) {
        response.status(400).json({
            message: "Faltan datos necesarios para crear la cuenta",
            missing
        })
    } else {
        const newAccount = await Account.createAccount(email, password)

        response.status(200).json({
            message: "Creado",
            newAccount
        })
    }
}