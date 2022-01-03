
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id: { type: String },
    title : { type: String },
    price : { type: Number }, 
    slug : { type: String }, 
    images:[String], 
    image : { type: String }, 
    category : { type: String }, 
    kg : { type: String}, 
}, {
    timestamps : true,
})


const product = mongoose.models.products || mongoose.model("products", ProductSchema);



export default product;