import { Request, Response } from "express";
import * as User from "../services/user.service"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const sendFriendRequest = async(req: Request, res: Response) => {
  const { receiverID } = req.params
  const { id: senderID } = req.user

  try {
    const request = await User.sendRequest(senderID, receiverID)
    
    console.log("Solicitud enviada", request)

    res.status(200).json({ message: "solicitud enviada", request })
  } catch (e) {
    let { message, name, code } = e as PrismaClientKnownRequestError

    if (code === "P2002") message = "relationship already exists"   // Unique contraint violation

    res.status(400).json({error: {name, message}})
    return
  }
}