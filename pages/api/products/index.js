import nc from "next-connect";
import product from "../../../modals/product";
import db from "../../../uitility/connectDB";


const handler = nc();

handler.get( async (req, res) => {

    await db.connect()

    const products = await product.find({});

    res.send(products);
    
})

export default handler;