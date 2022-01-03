
import nc from "next-connect";
import user from "../../../modals/user";
import db from "../../../uitility/connectDB";
import bcrypt from "bcryptjs";
import tokens from "../../../modals/tokens";

const handler = nc();

handler.post( async (req , res) =>{
    
    try {

        await db.connect()

        const { name, email, password, token } = req.body;
        
        console.log(token);
        // delete
        const deleteToken = await tokens.findOneAndDelete({ _id: token });
        
        if (!password && !password.length >= 6) {
            res.status(400).send({ message: "Invalid Password"});
            return;
        }

        const userData = {
            "name": name,
            "email": email,
            "password": bcrypt.hashSync(password),
        }

        const insertUser = user.insertMany(userData);
        
        res.status(200).send({ message: `Congratulations , ${name.split(" ")[0].toUpperCase()} Your Account Created Successfully`});

    } catch (err){
        throw new Error(err);
    }

})

export default handler;