import nc from "next-connect";
import user from "../../../modals/user";
import db from "../../../uitility/connectDB";
import { nanoid } from 'nanoid';
import tokens from "../../../modals/tokens";
import sgMail from '@sendgrid/mail';
import bcrypt from "bcryptjs";
const ObjectId = require('mongodb').ObjectId; 


const handler = nc();

handler.post(async (req, res) => {

    await db.connect();
    
    sgMail.setApiKey(process.env.EMAIL_API_KEY)

    try {

        const { email } = req.body;
 
        if (!email) {
            res.status(422).json({ message: "something wrong with your email" });
            return;
        };

        const checkEmailInDB = await user.findOne({ email: email });

        if (!checkEmailInDB) {
            res.status(422).json({ message: "we couldn't find your email or try again" });
            return;
        }

        // cateate a secure reset password token
        const securedTokenId = nanoid(32);

        const obj = {
            "_id": securedTokenId,
            "creatorId": checkEmailInDB._id,
            "type": "passwordReset",
        }

        const insertToken =  await tokens.insertMany(obj)

        const mag = {
            to: checkEmailInDB.email,
            from: "tomwalkers17@gmail.com",
            subject: "tocrystal Reset your password.",
            html: `
                <div>
                    <p>Hello, ${checkEmailInDB.name}</p>
                    <p>Please follow <a href="${process.env.WEB_URI}/forgot-password/${securedTokenId}">this link</a> to reset your password.</p>
                </div>
            `,
        }
        
        await sgMail.send(mag);
        res.json({ message: `Email has been sent on ${checkEmailInDB.email}` });    

    } catch (err) {
        console.err(err);
    }
})


handler.put(async (req, res) => {
    
    await db.connect();

    try {
        
        const { token , password } = req.body
    
        if (!token && !password) {
            res.json({message : "somthing went wrong Please try again"})
            return;
        }

        // delete token 
        
        const deletedToken = await tokens.findOneAndDelete({ _id: token });
        
        

        if (!deletedToken) {
            res.status(403).end();
        }

        const newPassword =  bcrypt.hashSync(password);

        const updateUserPassword = await user.updateOne(
            { "_id": new ObjectId(deletedToken.creatorId)} ,
            {$set : { "password" : newPassword}},
        )

        res.json({ message: "Your Password successfully set" });

    } catch (err) {
        throw new Error(err.message);
    }

} )

export default handler;
