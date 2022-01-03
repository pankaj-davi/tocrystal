import nc from "next-connect";
import category from "../../modals/cotegory";
import db from "../../uitility/connectDB";
import CategoryData from "../../conponets/category/CategoryData";
import ProductsData from "../../conponets/category/ProductData";
import product from "../../modals/product";
import user from "../../modals/user";
import { UserData } from "../../conponets/LoginForm/UserData";

const handler = nc();

handler.get( async (req, res) => {

    await db.connect();
    // deleted privouse product 
    await category.deleteMany();
    await category.insertMany(CategoryData);

    await product.deleteMany();
    await product.insertMany(ProductsData);

    await user.deleteMany();
    await user.insertMany(UserData);
    

    res.send({message : "seeded succesfully"});

    
})

export default handler;