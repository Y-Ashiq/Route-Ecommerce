import userModel from "../../../database/model/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import { apiFeatures } from "../../util/APIfeatures.js";
import { AppError } from "../../util/AppError.js";

const addUser = handleError(async (req, res, next) => {
  let isExist = await userModel.findOne({ email: req.body.email });
  
  if (isExist) return next(new AppError("this user is already exist", 409));

  const User = await userModel.create(req.body);
  res.json({ message: "User added", User });
});

const getUser = handleError(async (req, res, next) => {
  const User = await userModel.findById(req.params.id);

  User
    ? res.json({ message: "User ", User })
    : res.json({ message: "User not found", User });
});

const getUsers = handleError(async (req, res, next) => {
  let apiFeature = new apiFeatures(userModel.find(), req.query)
    .pagination()
    .fields()
    .search()
    .sort()
    .filter();

  const Users = await apiFeature.mongooseQuery;

  Users
    ? res.json({ message: "Users", Users })
    : res.json({ message: "User not found", Users });
});

const updateUser = handleError(async (req, res, next) => {
  const User = await userModel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User updated", User });
});

const changePassword = handleError(async (req, res, next) => {
  const User = await userModel.findByIdAndUpdate(req.params.id, req.body);

  req.body.changePasswordAt = Date.now()

  User
    ? res.json({ message: "User updated", User })
    : res.json({ message: "User not found", User });
});

const deleteUser = handleError(async (req, res, next) => {
  const User = await userModel.findByIdAndDelete(req.params.id);

  User
    ? res.json({ message: "User deleted", User })
    : res.json({ message: "User not found", User });
});

export default {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword
};
