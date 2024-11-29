import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  age: number;
  city: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.index({ city: 1 });
UserSchema.index({ age: 1 });
export default mongoose.model<IUser>("User", UserSchema);
