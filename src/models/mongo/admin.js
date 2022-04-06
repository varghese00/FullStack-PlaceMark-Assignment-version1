// /* eslint-disable no-shadow */
// import { User } from "./user.js";


// // eslint-disable-next-line prefer-const
// let password="admin123"

// export const Admin= async ()=>{
//     // eslint-disable-next-line consistent-return
//     User.findOne({role:"admin"},(err,admin)=>{
//         if (err) throw(err)
//         if (admin){
        
//              return "Admin account already exists"
//         }
//         User.create({
//             firstName: "Varghese",
//             lastName: "Joseph",
//             email:"varghese00@gmail.com",
//             password:password,
//             role:"admin"
//         })
//         return "Admin account created"
//     })
// }