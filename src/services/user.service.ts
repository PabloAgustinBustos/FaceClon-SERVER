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

export const findUser = async(userID: string, accountID: string) => {
  console.log("Se busca un usuario con los datos", {accountID, userID})

  const user = await prisma.user.findUnique({
    where: { 
      id: userID,
      accountID
    },

    select: {
      id: true,
      username: true,
      photoURL: true,
      accountID: true
    }
  })

  return user
}

export const sendRequest = async(senderID: string, receiverID: string) => {
  console.log(`Usuario ${senderID} envía solicitud a ${receiverID}`)

  const request = await prisma.friendship.create({
    data: {
      firstFriendID: senderID,
      secondFriendID: receiverID
    }
  })

  return request
}