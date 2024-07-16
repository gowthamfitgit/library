import dotenv from "dotenv"
import { ENV } from "../config/config.js";
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { v4 as uuidv4 } from "uuid";

dotenv.config({path:`./env/.env.${ENV}`})




const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain:process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};



const app = initializeApp(firebaseConfig);

const imagedb = getStorage(app)





export const ImageUpload = async(req)=>{

  try{


      let image = req.files.imageurl   // actual image file
   
      let imageref = ref(imagedb,`images/${uuidv4()}.${image.name.split(".").pop()}`)  // referrence instance with folder and file name
      await uploadBytes(imageref,image.data,{ contentType: image.mimetype })  

      const imageUrl = await getDownloadURL(imageref);  // to generate url

      return imageUrl;

  }
  catch(err){
  
    return false;
  }
}