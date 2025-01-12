// to check the role of req as manager from cookie 
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const isManager = async (req, res, next) => {
    // grabbing cookie
    const token = req.cookies.token;

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // check if user is manager
        const user = await User.findById(decoded.id).select('-password');
        if (user && user.role === "manager") {
            req.user = user;
            next();
        } else {
            // empty cookie
            res.clearCookie("token");
            res.status(403).json({ error: "Unauthorized" });
        }
    } catch (error) {
        // empty cookie
        res.clearCookie("token");
        res.status(403).json({ error: "Unauthorized" });
    }
}

module.exports = isManager;