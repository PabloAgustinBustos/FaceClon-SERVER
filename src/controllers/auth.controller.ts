import { Request, Response } from "express";
import * as Account from "../services/account"
import * as User from "../services/user"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

type SignUpDTO = {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  birthday: string
}
export const signUp = async(req: Request<{},{},SignUpDTO>, res: Response) => {
  const { email, password, firstname, lastname, username, birthday } = req.body
    
  try {
    const newAccount = await Account.createAccount(email, password)
  
    console.log("Se creó una cuenta", newAccount)

    const newUser = await User.createUserWithProfile(newAccount.id, username, firstname, lastname, birthday)

    console.log("Se creó un usuario con perfil", newUser)

    res.status(201).json({
      message: "Creado",
      accountID: newAccount.id,
      userID: newUser.id
    })
  } catch(e) {
    const { message, name } = e as Error

    res.status(400).json({error: {name, message}})
  }
  

  return
}