import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { findUser } from "../services/user.service";

export const checkSignUpDTO = (req: Request, res: Response, next: NextFunction) => {
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

  next()
}

export const checkLoginDTO = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies)
  const { email, password } = req.body
  
  const missing = []

  if (!email) missing.push("email")
  if (!password) missing.push("password")

  if (missing.length > 0) {
    res.status(400).json({
      message: "Faltan datos necesarios para crear la cuenta",
      missing
    })

    return 
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({
      message: "Formato de email inválido"
    })

    return
  }

  next()
}

interface DecodedToken extends JwtPayload {
  userID: string
  accountID: string
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        accountID: string;
        username: string;
        id: string;
        photoURL: string | null;
      }
    }
  }
}


export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    console.log('token', token)

    if (!token) {
      res.status(401).json({ error: "unauthorized - no token provided" })
      return
    }

    const { userID, accountID } = jwt.verify(token, process.env.SECRET as string) as DecodedToken
    console.log('token verificado')

    const user = await findUser(userID, accountID)

    if (!user) { 
      res.status(404).json({ error: "user not found" })
      return
    }

    req.user = user

    next()
  } catch (e) {
    const { message, name } = e as Error

    let status = 500

    if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') status = 401

    res.status(status).json({error: {name, message}})
    return 
  }
}