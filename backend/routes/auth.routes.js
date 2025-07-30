import express from 'express';
import { Login, Logout, SignUp } from '../controllers/auth.js'; 

const authRouter = express.Router();

authRouter.post('/signup', SignUp)
authRouter.post('/signin',Login)
authRouter.get('/logout',Logout)

export default authRouter;