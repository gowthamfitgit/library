
import bcrypt from "bcrypt"
import {ResponseHandler} from "../utils/responseHandler.js";
import {GenerateToken} from "../middlewares/jwt.js"

import User from "../models/user.js"


export const register = async(req,res)=>{

  try{

    req.body.password = await bcrypt.hash(req.body.password,5)
    let user = new User(req.body)
    user = await user.save()

    ResponseHandler(res,200,"Success","User Registered",user)
    
  }
  catch(err){

    ResponseHandler(
        res,
        400,
        "Failed",
        (err.code === 11000 && "email" in err.keyValue) ? "Email exists try a different email" : "User registration failed",
        [],
        err.message
    )
  }

}

export const login = async(req,res)=>{
    try{

        let user = await User.findOne({email:req.body.email})   
    
        if(user){

            let passwordMatch = await bcrypt.compare(req.body.password,user.password)  

            if(passwordMatch) GenerateToken(req,res,user)
            else return ResponseHandler(res,401,"Failed","Invalid credentials")

        }
        else return ResponseHandler(res,404,"Failed","User not found")

    }
    catch(err){
        ResponseHandler(
            res,
            400,
            "Failed",
            "Login failed",
            [],
            err.message
        )
    }
}