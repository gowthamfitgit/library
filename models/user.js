import mongoose,{Schema} from "mongoose";

const User = new Schema({

   name:{
        type:String,
        required:true
   },
   email:{
        type:String,
        required:true,
        unique:true
   },
   password:{
        type:String,
        required:true
   },
   isAuthor:{
        type:Boolean,
        default:false,
   },
   role:{
        type:String,
        enum:['admin','user'],
        default:"user"
},

    
},{timestamps:true})

const Users = mongoose.model("User",User)

export default Users;