import auth from "./auth.js";

const authAdmin = (req, res, next) => {
  // check if user is admin
  if (!req.user.isAdmin) {
    return res.status(401).json({ error: "Unauthorized: This is admin route" });
  }

  return next();
};

export default [auth, authAdmin];
