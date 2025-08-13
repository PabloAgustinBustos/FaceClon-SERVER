import { NextFunction, Request, Response } from "express";

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