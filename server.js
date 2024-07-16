import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fileUpload from "express-fileupload";
import {ENV} from "./config/config.js"
import Db_Connection from "./DB/db.js"
import router from "./routers/router.js"
import { ImageUpload } from "./utils/imageUploader.js";


dotenv.config()

// dotenv.config({path:`./env/.env.${ENV}`})


const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())




// Database connection

Db_Connection()

// server connection

app.listen(3001,()=>{
    console.log(`Server running on port ${process.env.PORT} && DEV_ENV :: ${ENV}`)
    
})

// router middleware

app.use("/api",router)






