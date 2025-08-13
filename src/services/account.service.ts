import prisma from "../models/prisma"
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/auth"

/*const accounts = [
    new Accounts("pablo@gmail.com", "pablo123"),
    new Accounts("juan@gmail.com", "juan123"),
]*/

export const getAccounts = async() => {
    const accounts = await prisma.account.findMany()

    return accounts
}

export const createAccount = async(email: string, password: string) => {
    console.log("Se crea una cuenta con los datos", {email, password})

    const newAccount = await prisma.account.create({
        data: { email, password }
    })

    return newAccount
}

export const findAccountAndCheckPassword = async(email: string, password: string) => {
    console.log(email, password)
    const account = await prisma.account.findUnique({
        where: {
            email
        },
        include: { user: true }
    })
    
    if (!account) throw new Error("User doesn't exist")

    if (account.password !== password) throw new Error("Wrong password")

    return { accountID: account.id, user: account.user }
}