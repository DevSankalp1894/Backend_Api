   const express = require("express");
   const userRouter = express.Router();
   const {UserModel} = require("../connection/connection");
   const {authenticator,loginAuthenticator} = require("../middleware/auth.middleware");
   var jwt = require('jsonwebtoken');
   const bcrypt = require('bcrypt');

   userRouter.post("/register" , authenticator , async(req, res) => {
              const {first_name,last_name,email,pass,location,city,age} = req.body;
              try {
             bcrypt.hash(pass, 5, async function(err, hash) {
                     let data = new UserModel({first_name,last_name,email,pass:hash,location,age});
                     await data.save();
                     res.send({"msg" : "Successfully registered"})
              });
            }

            catch(err) {
                   res.send({"msg" : err.message})
            }
           
   })

   userRouter.post("/login" , async(req, res) => {
    const {email,pass} = req.body;
    const collection = await UserModel.find({email:email});
    bcrypt.compare(pass, collection[0].pass, function(err, result) {
          if(result){
            if(collection.length > 0){
                const userId = collection[0]._id;
                var token = jwt.sign({ id: userId }, 'masai');
                  res.send({"token" : token});
                }
            
                else {
                      res.send({"msg" : "Register first"})
                }
          }
          else {
            res.send({"msg" : "Incorrect email or passord"})
          }
    });    
})


   module.exports={userRouter}