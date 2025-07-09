const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
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

module.exports = {
    UserModel,
    user,
    User,
    Component,
    SearchHistory
};
