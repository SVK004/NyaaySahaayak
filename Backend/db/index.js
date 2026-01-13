const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')

let isnotDBConnected = true;
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    isnotDBConnected = false;
    console.log("MongoDB connected");             //mongodb+srv://NHKusers:NHKusers@nhkusers.okqyjty.mongodb.net/NHK_users
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

// Create a MongoDB schema
const userSchema = new mongoose.Schema({            //signup
    name: String,
    email: String,
    password: String,
});
const mongoscheema = new mongoose.Schema({                       //google
  name:{
      type:String,
  },
  gmailid:{
      type:String
  }
});
const searchHistorySchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const user = mongoose.model('facebook_datas', {              //facebook
  facebookId: String,
  displayName: String,
});
const UserModel =  mongoose.model("Google_data",mongoscheema);
const User = mongoose.model('On-site_login', userSchema);
// const Login = mongoose.model("Login_Data",LoginSchema)
const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

const ComponentSchema = new mongoose.Schema({
    name: String,
    description: String,
  });
  const Component = mongoose.model('Component', ComponentSchema);



  async function getIPCData(query){
    try {
        // FIX: Use __dirname to locate ipc.json relative to this file
        const jsonData = fs.readFileSync(path.join(__dirname, '../../ipc.json'), 'utf8');
        localData = JSON.parse(jsonData);
        console.log("Local JSON data loaded");

        return await localData.filter(item => 
            (item.section_title && item.section_title.toLowerCase().includes(query.toLowerCase())) || 
            (item.keywords && item.keywords.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 10);

    } catch (err) {
        console.error("Failed to load local JSON file");
    }
  }

  function isDBDisconnected() {
  return isnotDBConnected;
}

module.exports = {
  isDBDisconnected,
  getIPCData,
  UserModel,
  user,
  User,
  Component,
  SearchHistory
};
