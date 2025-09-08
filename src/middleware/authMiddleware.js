import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// i am using it to check if a user is logged in
const protect = async (req, res, next) => {
  let token;

  // i need to check the request header for my token
  // it should look like 'Bearer' and then the token string
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // here i am just using the token part from the header
      token = req.headers.authorization.split(" ")[1];

      // now i verify the token with my JWT_SECRET to see if its matching
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // the token has the user id so i can find the user in the database
      // then i attach the user info to the request but without the password
      req.user = await User.findById(decoded.id).select("-password");

      // if everything looks good so i will let them through
      next();
    } catch (error) {
      // Adding catch if the token is bad
      console.error(error);
      res.status(401).json({ message: "Not authorized token failed" });
    }
  }

  // if i didn't find a token at all i will send this error
  if (!token) {
    res.status(401).json({ message: "Not authorized no token" });
  }
};

export { protect };
