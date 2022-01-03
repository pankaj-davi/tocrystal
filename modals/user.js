import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password : { type: String, unique: true},
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps : true,
})


const user = mongoose.models.users || mongoose.model("users", UserSchema);

export default user;