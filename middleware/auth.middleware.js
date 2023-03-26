
  const {UserModel, NoteModel} = require("../connection/connection");
  const bcrypt = require('bcrypt');
  var jwt = require('jsonwebtoken');


   const authenticator = async(req , res , next) => {
     
        if(req.body.first_name && req.body.last_name && req.body.email && req.body.pass && req.body.location && req.body.age ){
  
        next();

        }

        else {
              res.send({"msg" : "Fill input credentials"})
        }
   }

     const loginAuthenticator = async(req , res, next) => {
          const token = req.headers.authorization;
          jwt.verify(token, 'masai', async(err, decoded) => {
            if(decoded){
              req.body.userID = decoded.id;
               let notesData = new NoteModel(req.body);
                 await notesData.save();
                // req.body.userID = decoded.id;
                next();
            } 

            if(err){
              res.send({"msg" : "Register first"})
            }
            });
         
     }

      module.exports={authenticator,loginAuthenticator};
