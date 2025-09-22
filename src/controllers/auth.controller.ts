import { Request, Response } from "express";
import * as Account from "../services/account.service"
import * as User from "../services/user.service"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { InvalidCredentialsError, UserNotFoundError } from "../exceptions/auth.exceptions";
import { generateToken } from "../utils/auth";

export const getMe = async(req: Request, res: Response) => {
  const { user } = req
    
  res.status(200).json({ message: "logeado", user })
}


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
}

type LoginDTO = {
  email: string
  password: string
}
export const login = async(req: Request<{}, {}, LoginDTO>, res: Response) => {
  const { email, password } = req.body

  try {
    const { user } = await Account.findAccountAndCheckPassword(email, password)
    
    const token = generateToken(user!.accountID, user!.id)

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,                 // Para que js no pueda acceder a la cookie (previene XSS)
      sameSite: "none",             // Previene ataques CSRF
      secure: process.env.NODE_ENV !== "development"
    })

    res.status(200).json({ message: "logeado", user })
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      res.status(404).json({error: "user not found"})
    }
    if (e instanceof InvalidCredentialsError) {
      res.status(401).json({error: "wrong password or email"})
    }
      
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e)
  
      res.status(500).json({error: "internal error"})
    }
  }
}

export const logout = async(req: Request, res: Response) => {
  console.log(req.cookies.token)
  try {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({ message: "bye" })
  } catch(e) {
    console.log(e)

  }
}