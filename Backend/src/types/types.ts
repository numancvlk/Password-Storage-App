//KÜTÜPHANE
import { Request } from "express";

//MODELS
import { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}
