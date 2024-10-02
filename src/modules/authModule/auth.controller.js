import userModel from "../../../database/model/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../util/AppError.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

const signUP = handleError(async (req, res, next) => {
  let isExist = await userModel.findOne({ email: req.body.email });

  if (isExist) return next(new AppError("this user is already exist", 409));

  const User = await userModel.create(req.body);
  res.json({ message: "User added", User });
});

const signIn = handleError(async (req, res, next) => {
  let { email, password } = req.body;

  let isExist = await userModel.findOne({ email: req.body.email });
  const isMatch = bcrypt.compareSync(password, isExist.password);

  if (isExist && isMatch) {
    let token = jwt.sign(
      { name: isExist.name, id: isExist._id, role: isExist.role },
      "mysecrettoken"
    );

    return res.json({ message: "successful signIn", token });
  }

  next(new AppError("incorrect email or password", 409));
});

const protectedRoutes = handleError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("invalid token", 404));

  let decoded = jwt.verify(token, "mysecrettoken");
  let isExist = await userModel.findById(decoded.id).select("-password");

  if (!isExist) return next(new AppError("user not found", 404));

  if (isExist.changePasswordAt) {
    let changePasswordTime = parseInt(
      isExist.changePasswordAt.getTime() / 1000
    );
    if (changePasswordTime > decode.iat)
      return next(new AppError("invalid token", 404));
  }

  
  req.user = isExist;
  next();
});

const allowTo = (...role) => {
  return handleError((req, res, next) => {
    if (!role.includes(req.user.role))
      return next(new AppError("not authorized", 403));

    next();
  });
};

export default { signIn, signUP, protectedRoutes , allowTo};
