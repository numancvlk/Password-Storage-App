//KÜTÜPHANE
import mongoose, { Document, Schema } from "mongoose";

export interface IPasswordItem extends Document {
  user: mongoose.Types.ObjectId;
  service: string;
  username: string;
  encryptedPassword: string;
}

const PasswordItemSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordItem = mongoose.model<IPasswordItem>(
  "PasswordItem",
  PasswordItemSchema
);
export default PasswordItem;
