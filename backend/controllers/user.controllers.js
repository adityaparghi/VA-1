import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set by the isAuth middleware
        const user = await User.findById(userId).select("-password -__v"); // Exclude password and __v field
        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Get current user error", error: error.message });
    }
}

export const updateAssistant = async(req,res) => {
    try {
        const {assistantName,imageUrl} = req.body;
        let assistantImage;
       if (req.file) {
        assistantImage = await uploadOnCloudinary(req.file.path);
       } else {
        assistantImage = imageUrl;
       }

       const user = await User.findByIdAndUpdate(req.userId, {assistantName,assistantImage},{new:true}).select("-password");
       return res.status(200).json(user);

    } catch (error) {
        return res.status(400).json({ message: "Update assistant error", error: error.message });
    }
}