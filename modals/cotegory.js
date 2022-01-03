
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id : {type : String} ,
    ProductCategory: { type: String},
    description: { type: String },
    categorySlug : { type: String },
    products :[{type: String}],
}, {
    timestamps : true,
})

const category = mongoose.models.category || mongoose.model("category", categorySchema);

export default category;
