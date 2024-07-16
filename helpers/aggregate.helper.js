import mongoose from "mongoose"


export const AggregateHelper = async(table,customquery)=>{

    try{
     
        let data = await table.aggregate(customquery)
        return data;

    }
    catch(err){
         console.log(err.message)
         return false
    }
}