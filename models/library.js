import mongoose,{Schema} from "mongoose";

const LibrarySchema = new Schema({

   name:{
        type:String,
        required:true,
        unique:true
   },
   location:{
        type:String,
        required:true
   },
   contactNumber:{
        type:String,
        required:true
   },
   headOfLibrary:{
        type:String,
        required:true
   },
   //Note :: contains list of book referrences added / removed by admin after verification
   
   inventory:[{
    type:Schema.Types.ObjectId,
    ref:"Book"
   }]

// Note :: separate admins can be set for each library , this can be added in future

//    admin:{
//         type:String,
//         required:true,
//         unique:true
//    },
//    adminPassword:{
//         type:String,
//         required:true
//    },
   
    
},{timestamps:true})

const Library = mongoose.model("Library",LibrarySchema)

export default Library;