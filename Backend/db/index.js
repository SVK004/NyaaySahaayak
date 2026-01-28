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



  // Inside Backend/db/index.js
async function getIPCData(query) {
    try {
        const jsonData = fs.readFileSync(path.join(__dirname, '../../ipc.json'), 'utf8');
        const localData = JSON.parse(jsonData);
        console.log("Local JSON data loaded");

        // Split the user query into individual words (ignoring case)
        const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);

        const results = localData.map(item => {
            let matchCount = 0;
            // Your JSON uses "keywords" and "section_title"
            const itemKeywords = (item.keywords || "").toLowerCase();
            const itemTitle = (item.section_title || "").toLowerCase();

            // Check how many query words match the keywords or title
            queryWords.forEach(word => {
                if (itemKeywords.includes(word) || itemTitle.includes(word)) {
                    matchCount++;
                }
            });

            return { ...item, matchCount };
        })
        const bestMatch = results
        .filter(item => item.matchCount > 0) // Only keep items that matched at least one word
        .sort((a, b) => b.matchCount - a.matchCount) // Rank by highest number of matches
        .slice(0, 10)

        if(bestMatch.length === 0) return [];

        return[{
            // Map JSON keys to what your Frontend expects (name and description)
            name: bestMatch[0].section_title,
            description: bestMatch[0].section_desc
        }];

    } catch (err) {
        console.error("Failed to load or process local JSON file:", err);
        return [];
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
