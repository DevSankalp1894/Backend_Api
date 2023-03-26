  const mongoose = require("mongoose");
  require("dotenv").config();

  const connection = mongoose.connect(process.env.mongoURL);

  const userSchema = mongoose.Schema({
            first_name : {type:String,required:true},
            last_name : {type:String,required:true},
            email:{type:String,required:true},
            pass:{type:String,required:true},
            location:{type:String,required:true},
            age : {type:String,required:true}
})

  const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    subject:{type:String,required:true},
    date:{type:String,required:true},
    userID:String,
})

  const UserModel = mongoose.model("user" , userSchema);

  const NoteModel = mongoose.model("note" , noteSchema);

    module.exports={connection , UserModel , NoteModel}