
import jwt from "jsonwebtoken";

const singToken = (user) => {
     return jwt.sign({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin : user.isAdmin
     }, process.env.JWT_KEY,
     {
          expiresIn : "30d"     
     })
}



export {singToken}