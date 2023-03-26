const express = require("express");
const notesRouter = express.Router();
const {UserModel,NoteModel} = require("../connection/connection");
var jwt = require('jsonwebtoken');
const {authenticator,loginAuthenticator} = require("../middleware/auth.middleware");

    notesRouter.post("/add", loginAuthenticator, async(req , res) => {
          try {
                     res.send({"msg" : "Your Notes added successfully"})
          }

          catch(err){
                res.send({"msg" : err.message})
          }
    })

    notesRouter.get("/", async(req , res) => {
        let token = req.headers.authorization;
        let decoded = jwt.verify(token , "masai");
       
      try {
            if(decoded){
             let notes = await NoteModel.find({userID : decoded.id});
             res.send(notes);
            }
            
            else {
                  res.send({"msg" : "No note has been created"});
            }
             
      }
      catch(err){
            res.send({"msg" : err.message})
      }   
})

  notesRouter.delete("/delete/:noteID" , async(req , res) => {
       const {noteID} = req.params;
        try {
         let data = await NoteModel.findByIdAndDelete({_id:noteID});
          if(data.length > 0){
           res.send(data);
          }

          else {
              res.send({"msg" : "No Note add Note first"})
          }
        }

       catch(err) {
            res.send({"msg" :err.message})
       }
  })

  notesRouter.patch("/update/:noteID" , async(req , res) => {
      const {noteID} = req.params;
       try {
        let data = await NoteModel.findByIdAndUpdate({_id:noteID} , req.body);
         if(data.length > 0){
          res.send(data);
         }

         else {
             res.send({"msg" : "No Note add Note first"})
         }
       }

      catch(err) {
           res.send({"msg" :err.message})
      }
 })

      module.exports = {notesRouter}

      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWQ5ZmRhMzg2Njc5NDIwZmE2MDkyOCIsImlhdCI6MTY3OTc1NzA1Mn0.UJjAPNSMVP1Ri29h5LyJtFyd_k-MZObfN7vlePVKQdA