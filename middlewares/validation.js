
import { ResponseHandler } from "../utils/responseHandler.js"
import {body, validationResult} from "express-validator"

export const UserValidation = async(req,res,next)=>{

    try{

    let validation = [

        body('email').exists().isEmail().withMessage("Enter a valid email"),
        body('password').exists().withMessage("password cannot be empty")
       
    ];
    

    if(req.url === "/register") 
       validation.push(body('name').exists().withMessage("Please provide a username"))


    await Promise.all(validation.map(validationRule => validationRule.run(req)));

    let errors = validationResult(req)

    
    if (!errors.isEmpty()) {
       
       return ResponseHandler(res,400,false,errors.array())

    }

    next()
    }
    catch(err){
        ResponseHandler(res,400,false,err.message)
    }

}

export const LibraryValidation = async(req,res,next)=>{

    try{

    let validation = [
        body('name').exists().withMessage("Please provide a username"),
        body('location').exists().withMessage("Please enter Location"),
        body('contactNumber').exists().withMessage("Please enter contact number").isLength({ min: 10, max:10 }).withMessage("Enter valid contact Number"),
        body('headOfLibrary').exists().withMessage("Please enter head name")
    
    ];
    



    await Promise.all(validation.map(validationRule => validationRule.run(req)));

    let errors = validationResult(req)

    
    if (!errors.isEmpty()) {
       
       return ResponseHandler(res,400,false,errors.array())

    }

    next()
    }
    catch(err){
        ResponseHandler(res,400,false,err.message)
    }

}


export const BookValidation = async (req, res, next) => {


  try {
    let validationRules = [
      body('name').exists().withMessage('Please provide a book name'),
      body('author').exists().withMessage('Please enter Author id'),
      body('library').exists().withMessage('Please enter Library id'),
      body('category').exists().withMessage('Please enter category'),
      body('totalCopies').exists().withMessage('Please enter number of copies').isInt({ min: 1 })
      .withMessage('Number of copies must be greater than 0'),
      body('imageurl').custom((value, { req }) => {
        // Check if 'file' exists in the input form data (assuming single file upload)
        if (!req?.files?.imageurl) {
          throw new Error('File upload is required');
        }
        return true;
      }),
    ];

    await Promise.all(validationRules.map(validationRule => validationRule.run(req)));

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
