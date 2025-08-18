import { NextFunction, Request, Response } from "express";
import { takeDecisionDTO } from "../controllers/users.controller";

export const checkTakeDecisionDTO = async (req: Request<{}, {}, takeDecisionDTO>, res: Response, next: NextFunction) => {
  const { status } = req.body

  if (!status) {
    res.status(400).json({
      message: "status is missing"
    })

    return 
  } else if (status !== "accepted" && status !== "rejected") {
    res.status(422).json({
      message: "invalid status"
    })

    return 
  }

  next()
}