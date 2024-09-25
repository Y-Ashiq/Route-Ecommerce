import mongoose, { Types } from "mongoose";
import 'dotenv/config';


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
      // required: true,
    },
    image: String,
    createdBy: { type: Types.ObjectId, res: "user" },
  },
  { timestamps: true, versionKey: false }
);

categorySchema.post("init", function (doc) {
  
  doc.image = process.env.SERVERURL + "/uploads/" + doc.image;
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
