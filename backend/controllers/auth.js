import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const SignUp = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        // Check if user already exists
        const emailExist = await User.findOne({email});
        if(emailExist) {
            return res.status(400).json({message: "Email already exists"});
        }

        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            password: hashedPassword,
            email  
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 80 * 24 * 60 * 60 * 1000, // 80 days
            secure: false,
            sameSite: "strict",
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const Login = async (req,res) => {
    try {
        const {email, password} = req.body;
        // Check if email exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Email does not exists"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid password"});
        }


        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 80 * 24 * 60 * 60 * 1000, // 80 days
            secure: false,
            sameSite: "strict",
        });

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({message: "Login error", error: error.message});
    }
}

export const Logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: "Logout error", error: error.message});
    }
}