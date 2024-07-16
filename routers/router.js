import express from "express"
const router = express.Router()

import { ImageUpload } from "../utils/imageUploader.js"

import { UserValidation , LibraryValidation , BookValidation} from "../middlewares/validation.js"
import {VerifyAdmin, VerifyToken} from "../middlewares/jwt.js"
import * as UserControllers from "../controllers/user.controller.js"
import * as LibraryControllers from "../controllers/library.controller.js"
import * as BookControllers from "../controllers/books.controller.js"


router.post("/register",UserValidation,UserControllers.register)
router.post("/login",UserValidation,UserControllers.login)

router.post("/createlibrary",VerifyAdmin,LibraryValidation,LibraryControllers.CreateLibrary)
router.put("/updatelibrary/:id",VerifyAdmin,LibraryControllers.UpdateLibraryDetails)
router.delete("/deletelibrary/:id",VerifyAdmin,LibraryControllers.DeleteLibrary)
router.get("/getalllibraries",VerifyToken,LibraryControllers.GetAllLibraries)
router.get("/getlibrarydetails/:id",VerifyToken,LibraryControllers.GetLibraryDetails)

router.put("/addbooktoinventory/:id/inventory",VerifyAdmin,LibraryControllers.AddBookToInventory)
router.put("/removebookfrominventory/:id/inventory/:bookid",VerifyAdmin,LibraryControllers.RemoveBookFromInventory)
router.get("/getallinventorybooks/:id/inventory",VerifyToken,LibraryControllers.GetAllInventoryBooks)



router.post("/addbook",VerifyToken,BookValidation,BookControllers.AddBook)
router.get("/getallbooks",VerifyToken,BookControllers.GetAllBooks)
router.delete("/deletebook",VerifyToken,BookControllers.DeleteBook)
router.put("/updatebook/:id",VerifyToken,BookControllers.UpdateBook)
router.get("/getbookdetails/:id",VerifyToken,BookControllers.getBookDetails)


router.put("/borrowbook/:id",VerifyToken,BookControllers.BorrowBook)
router.put("/returnbook/:id",VerifyToken,BookControllers.ReturnBook)







export default router