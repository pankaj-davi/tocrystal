import  mongoose  from "mongoose";

const tokenSchema = new mongoose.Schema({
    _id: { type: String },
    creatorId: { type: String },
    type: { type: String },
    createdAt: { type: Date, expires: '20m', default: Date.now },
    name : {type : String},
})

const tokens = mongoose.models.tokens || mongoose.model("tokens", tokenSchema);

export default tokens;

