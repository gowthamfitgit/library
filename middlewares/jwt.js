import jwt from "jsonwebtoken"
import { ResponseHandler } from "../utils/responseHandler.js"

export const GenerateToken = async(req,res,user)=>{
    
    try{
        
        let data = {
            name:user.name,
            role:user.role 
        }

        let token = jwt.sign( data, user.role == "admin" ? process.env.ADMIN_SECRET : process.env.USER_SECRET )

        return ResponseHandler(res,200,"Success","Login successfull",`Bearer ${token}`)

    }
    catch(err){
        ResponseHandler(res,400,"Failed",err.message)
    }
}

// Note :: used to verify admin only priveleges 
// example :: /addtoinventory

export const VerifyAdmin = async(req,res,next)=>{

try{

    if(!req.headers.authorization) return ResponseHandler(res,401,"Failed","Invalid Admin access")

    let token = req.headers.authorization.split(" ")[1]
    let data =  jwt.verify(token,process.env.ADMIN_SECRET)

    if(data?.role == "admin") next()
    else  ResponseHandler(res,401,"Failed","Invalid Admin access")
}
catch(err){
    ResponseHandler(res,400,"Failed",err.message)
}


}

// Note :: this token is used for common endpoints accessible by both admin and user 
// example :: /getalllibraries

export const VerifyToken = async(req,res,next)=>{

    try{
    
        if(!req.headers.authorization) return ResponseHandler(res,401,"Failed","Invalid Token")
        let token = req.headers.authorization.split(" ")[1]

        let data = null;

        try{
            data =  jwt.verify(token,process.env.USER_SECRET)
        }
        catch(userErr){
            data =  jwt.verify(token,process.env.ADMIN_SECRET)
        }
       
        if(data) next()
     
        else  ResponseHandler(res,401,"Failed","verification failed")
    }
    catch(err){
        ResponseHandler(res,400,"Failed",err.message)
    }
    
    
    }