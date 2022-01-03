

import nc from "next-connect";
import user from "../../../modals/user";
import db from "../../../uitility/connectDB";
import sgMail from '@sendgrid/mail';
import { nanoid } from 'nanoid';
import tokens from "../../../modals/tokens";

const handler = nc();

handler.post(async (req, res) => {

    await db.connect()
     sgMail.setApiKey(process.env.EMAIL_API_KEY)

    try {

        const { name, email, } = req.body;

        if (!name && !email) {
            res.status(400).send({ message: "name  and email is requried"});
            return;
        }
    
        const checkExisting = await user.findOne({ email: email });
        
        if (checkExisting) {
            res.status(422).send({ message: "This email already register at our website if you forgot password Please Clik blow to password forgot" });
            return;
        }


        // cateate a secure reset password token
        const securedTokenId = nanoid(32);

        const userData = {

            "_id": securedTokenId,
            "name": name,
            "creatorId": email ,
            "type": "passwordSetup",
        }

        const insert = await tokens.insertMany(userData);


        const mag = {
            to: email,
            from: "tomwalkers17@gmail.com",
            subject: "tocrystal Setup your Password.",
            html: `
                <div>
                    <p className="test">Hello, ${name}</p>
                    <p>Please follow <a href="${process.env.WEB_URI}/signup-password-setup/${securedTokenId}">this link</a> to setup your password.</p>
                </div>
            `,
        }
        
        await sgMail.send(mag);
        
        return res.status(200).send({message : `Email has been sent on ${email} Please Setup Your Password`});
        
    } catch (err) {
        return res.status(500).send(err.message);
   }

});

export default handler;