import { v4 as uuidv4 } from "uuid";
import { AppError } from "./AppError.js";
import multer from "multer";

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(new AppError("jpg, png and jpeg format only", 402));
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

export const imgUpload = (fieldName) => {
  return fileUpload().single(fieldName);
};
