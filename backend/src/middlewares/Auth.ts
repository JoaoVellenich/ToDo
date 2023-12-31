import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../environment/config";

export function authRoute(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token.split(" ")[1], jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.locals.user = user;
    next();
  });
}
