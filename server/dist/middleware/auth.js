import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const headers = req.headers.authorization;
    if (headers) {
        let token = headers.split(" ")[1];
        if (token) {
            const secretKey = process.env.JWT_SECRET_KEY || "";
            jwt.verify(token, secretKey, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                req.user = data;
                next();
            });
        }
    }
    else {
        res.send(400).json({ message: "Couldn't find token" });
    }
};
