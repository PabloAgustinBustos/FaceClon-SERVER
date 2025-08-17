import prisma from "../models/prisma"

export const createUserWithProfile = async(accountID: string, username: string, firstname: string, lastname: string, birthday: string) => {
  console.log("Se crea un usuario con los datos", {accountID, username})

  const newUser = await prisma.user.create({
    data: { 
      username, 
      accountID,
      profile: {
        create: {
          firstname,
          lastname,
          birthday: new Date(birthday).toISOString()
        }
      }
    }
  })

  return newUser
}