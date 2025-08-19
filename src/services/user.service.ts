import { RelationshipError, SelfRequestError } from "../exceptions/user.exceptions"
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

export const getFriendRequests = async(userID: string) => {
  const requests = await prisma.friendship.findMany({
    where: {
      secondFriendID: userID,
      status: "pending"
    },
    
    include: {
      firstFriend: true
    }
  })

  return requests.map(req => ({ 
    senderID: req.firstFriendID, 
    username: req.firstFriend.username,
    photoURL: req.firstFriend.photoURL,
    requestDate: req.createdAt 
  }))
}

export const getFriends = async(userID: string) => {

  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { firstFriendID: userID,  status: "accepted" },
        { secondFriendID: userID, status: "accepted" },
      ],
    },
    
    include: {
      firstFriend: true,
      secondFriend: true
    }
  })

  return friends.map(req => { 
    if (req.firstFriendID !== userID) {
      return {
        senderID: req.firstFriendID, 
        username: req.firstFriend.username,
        photoURL: req.firstFriend.photoURL,
        friendsSince: req.updatedAt 
      }
    } else {
      return {
        senderID: req.secondFriendID, 
        username: req.secondFriend.username,
        photoURL: req.secondFriend.photoURL,
        friendsSince: req.updatedAt 
      }
    }
  })
}

export const sendRequest = async(senderID: string, receiverID: string) => {
  if (senderID === receiverID) {
    throw new SelfRequestError("User cannot friend themselves");
  }

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { firstFriendID: senderID,  secondFriendID: receiverID },
        { firstFriendID: receiverID, secondFriendID: senderID },
      ],
    },
  });

  if (existing) {
    throw new RelationshipError("Friendship already exists");
  }
  
  console.log(`Usuario ${senderID} envía solicitud a ${receiverID}`)

  const request = await prisma.friendship.create({
    data: {
      firstFriendID: senderID,
      secondFriendID: receiverID
    }
  })

  return request
}

export const takeDecision = async (myID: string, senderID: string,decision: "accepted" | "rejected") => {
  console.log(`Usuario ${myID} toma la decisión ${decision} con ${senderID}`);

  let relationship;

  if (decision === "accepted") {
    relationship = await prisma.friendship.update({
      where: {
        firstFriendID_secondFriendID: {
          firstFriendID: senderID,
          secondFriendID: myID,
        },
      },
      data: { status: decision },
    });
  } else if (decision === "rejected") {
    relationship = await prisma.friendship.delete({
      where: {
        firstFriendID_secondFriendID: {
          firstFriendID: senderID,
          secondFriendID: myID,
        },
      },
    });

    return
  }

  return {
    status: relationship!.status,
    updatedAt: relationship!.updatedAt,
  };
};
