const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Unauthorized", success: false });
        }

        const token = authHeader.split(" ")[1];  // Correct split
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.user = decoded.userID;  // Set the correct field

        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token", success: false });
    }
};
