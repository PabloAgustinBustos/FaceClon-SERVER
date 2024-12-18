import { Accounts } from "../models/accounts"
import prisma from "../models/prisma"

/*const accounts = [
    new Accounts("pablo@gmail.com", "pablo123"),
    new Accounts("juan@gmail.com", "juan123"),
]*/

export const getAccounts = async() => {
    const accounts = await prisma.account.findMany()

    return accounts
}

export const createAccount = async(email: string, password: string) => {
    const newAccount = await prisma.account.create({
        data: { email, password }
    })

    return newAccount
}