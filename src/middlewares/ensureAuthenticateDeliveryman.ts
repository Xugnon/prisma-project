import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization as string;

  if (!authHeader) {
    response.status(401).json({
      message: "Token missing!"
    });
  };

  const [,token ] = authHeader.split(" ")

  try {
    const { sub } = verify(token, "a7c10a232e579987672da185f88c91ef") as IPayload
    
    request.id_deliveryman = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  };
}