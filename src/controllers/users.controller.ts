import { Request, Response } from "express";
import * as User from "../services/user.service"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RelationshipError, SelfRequestError } from "../exceptions/user.exceptions";

export const sendFriendRequest = async(req: Request, res: Response) => {
  const { receiverID } = req.params
  const { id: senderID } = req.user

  try {
    const request = await User.sendRequest(senderID, receiverID)
    
    console.log("Solicitud enviada", request)

    res.status(200).json({ message: "solicitud enviada", request })
  } catch (e) {
    if (e instanceof SelfRequestError) {
      res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    if (e instanceof RelationshipError) {
      res.status(409).json({ message: "Friendship or request already exists between these users" });
    }
    
    if (e instanceof PrismaClientKnownRequestError) {
      let { message, code } = e
  
      if (code === "P2002") message = "relationship already exists"   // Unique contraint violation
  
      res.status(409).json({error: message})
    }
  }
}

export type takeDecisionDTO = {
  status: "accepted" | "rejected"
}

type takeDecisionParams = {
  senderID: string
}

export const takeDecision = async (req: Request<takeDecisionParams, {}, takeDecisionDTO>, res: Response) => {
  const { status } = req.body
  const { id: myID } = req.user
  const { senderID } = req.params

  try {
    const relationship = await User.takeDecision(myID, senderID, status)

    if (!relationship) {
      res.status(200).json({ message: "rejected" })
    }

    res.status(200).json(relationship)
  } catch (e) {
    const {name, message, code} = e as PrismaClientKnownRequestError

    console.log(code, message)

    res.status(500).json({name, code, message})
  }
}