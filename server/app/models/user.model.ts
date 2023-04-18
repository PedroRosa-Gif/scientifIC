import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    ra: { type: String, required: true },
    birthdate: { type: Date, required: true },
    type: { type: Number, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;