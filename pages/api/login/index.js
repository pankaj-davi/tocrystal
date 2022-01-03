import nc from "next-connect";
import user from "../../../modals/user";
import db from "../../../uitility/connectDB";
import bcrypt from "bcryptjs";
import { singToken } from "../../../uitility/Auth";

const handler = nc();

handler.post(async (req, res) => {

    await db.connect()

    const userD = await user.findOne({ email: req.body.email });

    if (!userD) return res.status(401).send({ message: "email is not correct" });
    
    
    if (userD && bcrypt.compareSync(req.body.password, userD.password)) {
        const token = singToken(userD);

        res.send({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });

    } else {
        res.status(401).send({ message: "password is Incorrect" });
    }
    
});

export default handler;