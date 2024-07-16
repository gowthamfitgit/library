import mongoose, { Schema } from "mongoose";

const Book = new Schema({

    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true

    },
    library: {
       type: Schema.Types.ObjectId,
       ref: "Library",
       required:true
    },
    copiesAvailable: {
        type: Number,
        required: true
    },
    totalCopies: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    borrowers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]



}, { timestamps: true })

const Books = mongoose.model("Book", Book)

export default Books;