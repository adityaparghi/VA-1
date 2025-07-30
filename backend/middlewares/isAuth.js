import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token /*|| req.headers.authorization?.split(' ')[1];*/
        if (!token) {
            return res.status(400).json({ message: "Unauthorized , token not found" });
        }
        const vereifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = vereifyToken.userId
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default isAuth;