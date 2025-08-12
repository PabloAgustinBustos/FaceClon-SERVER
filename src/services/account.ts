import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
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
    console.log("Se crea una cuenta con los datos", {email, password})

    /*const exists = await prisma.account.findFirst({ 
        where: { email, password }
    })

    if (exists) throw new Error("user already exist")*/

    const newAccount = await prisma.account.create({
        data: { email, password }
    })

    return newAccount
}