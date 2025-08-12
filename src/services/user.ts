import prisma from "../models/prisma"

export const createUserWithProfile = async(accountID: number, username: string, firstname: string, lastname: string, birthday: string) => {
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
  /*try {
      const newAccount = await prisma.account.create({
          data: { email, password }
      })
      
      return newAccount
  } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
          console.log("ERROR", {...e, message: "Posiblemente se esté violando una constraint del modelo"})
      }
  }*/
}