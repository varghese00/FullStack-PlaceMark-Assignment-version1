/* eslint-disable no-shadow */
import { User } from "./user.js";


// eslint-disable-next-line prefer-const
let password="admin123"

export const Admin= async ()=>{
    // eslint-disable-next-line consistent-return
    User.findOne({scope:"admin"},(err,admin)=>{
        if (err) throw(err)
        if (admin){
        // console.log("yes admin is here")
             return "Admin account already exists"
        }
        
        User.create({
            firstName: "Varghese",
            lastName: "Joseph",
            email:"varghese00@gmail.com",
            password:password,
            scope:"admin"
        })
        console.log("yes admin is created")

        return "Admin account created"
    })
}