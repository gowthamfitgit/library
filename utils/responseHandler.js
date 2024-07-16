

export const ResponseHandler = (res,statuscode,status,message,data=[],error={})=>{

    res.status(statuscode).json({status,message,data,error})
}