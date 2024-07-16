import mongoose,{Schema} from "mongoose";

const Db_Connection = ()=>{

    try{


        const DB_USER = process.env.DB_USER
        const DB_PASSWORD = process.env.DB_PASSWORD
        const DB_APPNAME =  process.env.DB_APPNAME
        const DB_NAME = process.env.DB_NAME
        
        const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_APPNAME}.yd8hwhf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`
        // const DB_URL = "mongodb://localhost/kalpas"
        mongoose.connect(DB_URL)
        .then(res=>{

            console.log("db connected")

            // test database connection

            // const test = mongoose.model("Test",new Schema({name:String}))
            // let data = new test({name:"testname"})
            // data.save()


        
        
        
        })
        .catch(err=>console.log("err in db connection :: ",err.message))
    }
    catch(err){
        console.log(err.message)
    }

   

}

export default Db_Connection;