import express from 'express'
import { createUser, loginUser, logOutUser } from '../controllers/userController.js';

const router = express.Router()

router.post("/register",createUser);
router.post("/login",loginUser);
router.post("/logout",logOutUser)

export default router