const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("connected to db");
})
.catch(()=>{
    console.log("acces denied");
});
const mongoscheema = new mongoose.Schema({
    name:{
        type:String,
    },
    gmailid:{
        type:String
    }
},{
    collection:'test'
})
const model =  mongoose.model("Google_data",mongoscheema)
module.exports=model