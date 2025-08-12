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

  const missing = []

  if (!email) missing.push("email")
  if (!password) missing.push("password")
  if (!firstname) missing.push("firstname")  
  if (!lastname) missing.push("lastname")
  if (!username) missing.push("username")
  if (!birthday) missing.push("birthday")
  
  if (missing.length > 0) {
      res.status(400).json({
          message: "Faltan datos necesarios para crear la cuenta",
          missing
      })

      return 
  } 

  if (password.length > 8) {
      res.status(400).json({
          message: "Contraseña muy grande. Debe de tener 8 caracteres como máximo"
      })

      return
  } 
    
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
    let message = ""
    let name = ""

    if (e instanceof Error) {
      message = e.message
      name = e.name
    }

    res.status(400).json({error: {name, message}})
  }
  

  return
}