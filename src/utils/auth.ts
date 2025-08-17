import jwt from "jsonwebtoken"

export const generateToken = (accountID: string, userID: string): string => {
  const token = jwt.sign({ 
    accountID, 
    userID
  }, process.env.SECRET as string, { expiresIn: "24h" })
  
  return token
}