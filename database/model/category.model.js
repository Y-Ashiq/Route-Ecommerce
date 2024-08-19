import mongoose, { Types } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is already taken"],
      trim: true,
      required: true,
      minlength: [3, "too short"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
    createdBy: { type: Types.ObjectId, res: "user" },
  },
  { timestamps: true, versionKey: false }
);

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
