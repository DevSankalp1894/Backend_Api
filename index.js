  const express = require("express");
  const mongoose = require("mongoose");
  const app = express();
  const {connection} = require("./connection/connection");
  const {userRouter} = require("./Routes/userRouter");
  const {notesRouter} = require("./Routes/notesRouter");
  require("dotenv").config();
  const cors = require("cors");
  app.use(express.json());
  app.use(cors());

   app.use("/user" , userRouter);
   app.use("/notes" , notesRouter);

  app.listen(process.env.port , async() => {
      try{
          await connection;
          console.log("connected to DB");
      }
      catch(err){
          console.log(err.message);
      }
         console.log("server is running on port 8000")
  })