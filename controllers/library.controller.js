import mongoose from "mongoose";
import Library from "../models/library.js"
import { ResponseHandler } from "../utils/responseHandler.js";
import {AggregateHelper} from "../helpers/aggregate.helper.js"


export const CreateLibrary = async (req, res) => {


    try {

        let library = new Library(req.body)
        library = await library.save()

        ResponseHandler(res, 200, "Success", "New Library created", library)


    }
    catch (err) {
        ResponseHandler(res, 400, "Failed", err.message)
    }
}

export const UpdateLibraryDetails = async (req, res) => {
    try {

        // to update details example {contactNumber:"2345678"}
        if(req.body?.contactNumber.length !== 10) ResponseHandler(res, 400, "Failed", "Enter valid contact Number")

        let findData = req.params.id
        let updateData = req.body
    
        let library = await Library.findByIdAndUpdate(findData, { $set: req.body })
        ResponseHandler(res, 200, "Success", "Details updated", library)


    }
    catch (err) {
    
        ResponseHandler(res, 400, "Failed", "Failed to update", [], err.message)

    }
}

export const GetAllLibraries = async(req,res)=>{
    try{

        let libraries = await Library.find()
        ResponseHandler(res, 200, "Success", "Libraries details", libraries)
    }
    catch(err){
        ResponseHandler(res, 400, "Failed", "Failed to retrieve libraries list", [], err.message)

    }
}

export const DeleteLibrary = async(req,res)=>{
    try{

        let libraries = await Library.findByIdAndDelete(req.params.id)
        ResponseHandler(res, 200, "Success", "Library deleted",)
    }
    catch(err){
        ResponseHandler(res, 400, "Failed", "Failed to delete", [], err.message)

    }
}

export const GetLibraryDetails = async(req,res)=>{
    try{
      let libraryid = req.params.id

      let customQuery = [

        {$match:{_id:new mongoose.Types.ObjectId(libraryid)}},
        {$lookup:{
              from:"books",
              localField:"_id",
              foreignField:"library",
              as:"books"
            }},
         {$unwind:"$books"},
         {$lookup:{
             from:"users",
             localField:"books.borrowers",
             foreignField:"_id",
             as:"books.borrowers"
             }}
             ,
          {$group:{
              _id:"$_id",
              name:{$first:"$name"},
              location:{$first:"$location"},
              contactNumber:{$first:"$contactNumber"},
              headOfLibrary:{$first:"$headOfLibrary"},
              bookDetails:{$push:{
                  _id:"$books._id",
                  author:"$books.author",
                  availableCopies:"$books.copiesAvailable",
                  totalCopies:"$books.totalCopies",
                  borrowerslist:{
                      $map:{
                          input:"$books.borrowers",
                          as:"borrower",
                            in: {
                              _id: "$$borrower._id",
                              name: "$$borrower.name",
                              email: "$$borrower.email"
            }
                          
                          }
                      }          
                  }}
              }}
           
        
        
        
        ]

      let data = await AggregateHelper(Library,customQuery)
      ResponseHandler(res,200,"Success","Library details",data)


    }
    catch(err){
        ResponseHandler(res,400,"Failed","failed to fetch Library details")

    }
}


// inventory

export const AddBookToInventory = async(req,res)=>{
    try{

        let libraryid = req.params.id
        let bookid = req.body.bookid

        let library = await Library.findByIdAndUpdate(libraryid,{$push:{inventory:bookid}},{new:true})
        ResponseHandler(res,200,"Success","added to inventory")


    }
    catch(err){
        ResponseHandler(res,400,"Failed","request Failed")
    }
}

export const RemoveBookFromInventory = async(req,res)=>{
    try{

        let libraryid = req.params.id
        let bookid = req.params.bookid

        let library = await Library.findByIdAndUpdate(libraryid,{$pull:{inventory:bookid}},{new:true})
        ResponseHandler(res,200,"Success","Removed from inventory")

    }
    catch(err){
        console.log(err.message)
        ResponseHandler(res,400,"Failed","request Failed")

    }
}

export const GetAllInventoryBooks = async(req,res)=>{
    try{

        let books = await Library.find({},{name:1,_id:1,inventory:1}).populate("inventory")
        ResponseHandler(res,200,"Success","inventory collection",books)

    }
    catch(err){
        ResponseHandler(res,400,"Failed","request Failed",[],err.message)

    }
}

