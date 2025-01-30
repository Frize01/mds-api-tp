
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// Description: Middleware pour vérifier si le token JWT est valide
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.sendStatus(401);
  }

  let token = authHeader;

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
