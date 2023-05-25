const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String
})


const user = mongoose.model('user',userSchema);  //it will map to the user document in SastaCodeChef database
module.exports = user;
