import jwt from "jsonwebtoken";
import User from "../../models/User";

function getSecret() {
  if (!process.env.SECRET_KEY) {
    const error = new Error("SECRET_KEY environment variable is required");
    error.statusCode = 500;
    throw error;
  }

  return process.env.SECRET_KEY;
}

export function createToken(user) {
  return jwt.sign({ payload: user._id, iss: "Mr-Chidex" }, getSecret(), {
    expiresIn: "24h",
  });
}

export async function requireUser(req) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    throw error;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, getSecret());
  } catch {
    const error = new Error("Unauthorized access");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.payload);
  if (!user) {
    const error = new Error("Unauthorized access");
    error.statusCode = 401;
    throw error;
  }

  return user;
}
