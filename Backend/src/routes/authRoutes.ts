//KÜTÜPHANELER
import express from "express";

//CONTROLLERS
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
