import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "02d4e29f333492808993479cf2f22c09") as IPayload;

    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError("Invalid token", 401)

  }
}