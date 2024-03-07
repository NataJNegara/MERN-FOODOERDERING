import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // check if header contains key
  const token = req.headers.access_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Access denied" });
  }

  // const { authorization } = req.headers;
  // if (!authorization) {
  //   return res.status(401).json({ error: "Unauthorized: Access denied" });
  // }

  // grab token from header
  // const token = authorization.split(" ")[1];

  try {
    // decoded & extract user id from token
    // const { id } = jwt.verify(token, process.env.SECRET);
    // req.user = await User.findById(id).select("_id");

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
