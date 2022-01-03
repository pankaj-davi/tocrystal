import nc from "next-connect";
import category from "../../../modals/cotegory";
import db from "../../../uitility/connectDB";


const handler = nc();

handler.get( async (req, res) => {

    await db.connect()

    const categorys = await category.find({});

    res.send(categorys);
    
})

export default handler;