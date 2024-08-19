import mongoose, { Types } from "mongoose";

const SubcategorySchema = new mongoose.Schema(
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
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const SubcategoryModel = mongoose.model("Subcategory", SubcategorySchema);

export default SubcategoryModel;
