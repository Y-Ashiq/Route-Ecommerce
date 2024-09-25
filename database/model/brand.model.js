import mongoose, { Types } from "mongoose";

const BrandSchema = new mongoose.Schema(
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
    logo: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = mongoose.model("brand", BrandSchema);

export default BrandModel;
