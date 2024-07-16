

import { ImageUpload } from "../utils/imageUploader.js"
import Books from "../models/book.js"
import { ResponseHandler } from "../utils/responseHandler.js"


// Borrowing Books -- decrement available copies by one and push userid into borrowers


export const BorrowBook = async(req,res)=>{
    try{

        let bookid = req.params.id
        let userid = req.body.userid   // example {userid:"8jlslkdls8"} -- object id of user

        let book = null

        book = await Books.findOne({
                                   _id:bookid,
                                   copiesAvailable:{$gt:0}})

        if(!book) return ResponseHandler(res,400,"Failed","Not available at the moment")


        book = await Books.findByIdAndUpdate(bookid,{
            $inc:{copiesAvailable:-1},
            $push:{borrowers:userid}
        })

        ResponseHandler(res,200,"Success","borrowed and updated",book)
        

    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","Not available ")

    }
}


// returning bookd -- increment availbale copies bu one and pull userid from borrowers
export const ReturnBook = async(req,res)=>{
    try{

        let bookid = req.params.id
        let userid = req.body.userid   // example {userid:"8jlslkdls8"} -- object id of user

        let book = await Books.findByIdAndUpdate(bookid,{
            $inc:{copiesAvailable:1},
            $pull:{borrowers:userid}
        })

        ResponseHandler(res,200,"Success","borrowed and updated",book)
        

    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","Not available ")

    }
}

export const AddBook = async(req,res)=>{
    try{

        let url = await ImageUpload(req)

        if(url){
            req.body.imageurl = url
            req.body.copiesAvailable = req.body.totalCopies

            let book = new Books(req.body)
            book = await book.save()

            ResponseHandler(res,200,"Success","Book added",book)
            

        }
        else ResponseHandler(res,400,"Failed","Failed to add book",[],err.message)

    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","Failed to add book",[],err.message)

    }
}


export const GetAllBooks = async(req,res)=>{
    try{

        let books = await Books.find({},{name:1,_id:0})
        ResponseHandler(res,200,"Success","List of Books",books)
    }
    catch(err){
        ResponseHandler(res,400,"Failed","failed to get List of Books")
    }
} 

export const DeleteBook = async(req,res)=>{
    try{
       
        if(!req.body.id) return ResponseHandler(res,400,"Failed","failed to delete book entry")

        let book = await Books.findByIdAndDelete(req.body.id)
        ResponseHandler(res,200,"Success","Book Delted")
    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","failed to delete book entry")
    }
} 

export const UpdateBook = async(req,res)=>{
    try{
        
        let id = req.params.id
        let updateData = req.body  // example : {category:"fiction"}

        let book = await Books.findByIdAndUpdate(id,{$set:updateData})
        ResponseHandler(res,200,"Success","Successfully updated",book)
    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","Failed to update book",)
    }
}


export const getBookDetails = async(req,res)=>{
    try{
        let bookid = req.params.id
        let book = await Books.findById(bookid)
                              .populate("author","name email")
                              .populate("library","name location contactNumber")
                              .populate("borrowers","name email")

        ResponseHandler(res,200,"Success","book detials",book)

    }
    catch(err){
        ResponseHandler(res,400,"Failed","Failed to get book detials",)
    }
} 