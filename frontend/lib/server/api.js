import multer from "multer";

const parseImageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
  fileFilter: (req, file, callback) => {
    callback(
      null,
      ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype),
    );
  },
}).single("image");

export function parseImage(req, res) {
  return new Promise((resolve, reject) => {
    parseImageUpload(req, res, (error) => {
      if (!error) return resolve();
      if (error.code === "LIMIT_FILE_SIZE") {
        error.statusCode = 400;
        error.message = "image too large. max 500kb";
      }
      reject(error);
    });
  });
}

export function handleApiError(res, error) {
  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) {
    const message = String(error.message || "Unknown server error").replace(
      /mongodb(?:\+srv)?:\/\/[^\s]+/gi,
      "[MongoDB URI redacted]",
    );
    console.error("API server error", {
      name: error.name || "Error",
      code: error.code || null,
      message,
    });
  }
  const message = statusCode >= 500 ? "Network Error" : error.message;
  return res.status(statusCode).json({ message });
}

export function methodNotAllowed(res, allowed) {
  res.setHeader("Allow", allowed);
  return res.status(405).json({ message: "Method not allowed" });
}

export function validName(value) {
  return typeof value === "string" && value.trim().length >= 3;
}

export function validPassword(value) {
  return typeof value === "string" && value.trim().length >= 5;
}

export function validEmail(value) {
  return (
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}
