const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;
const url = 'mongodb://localhost:27017/';
const databaseName = 'NHK_dataset';

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Use bodyParser.json() for parsing JSON in the request body

const connectToDatabase = async () => {
  return MongoClient.connect(url);
};

app.post('/search', async (req, res) => {
  try {
    if (!req.body || !req.body.textInput) {
      return res.status(400).send("Bad Request: Missing or invalid input.");
    }

    const userInput = req.body.textInput;
    const userArray = userInput.split(' ');

    const client = await connectToDatabase();
    const database = client.db(databaseName);
    const collection = database.collection('everything1models');

    let data = [];

    for (let element of userArray) {
      const ans = await collection.find({ "keywords": { $regex: `${element}`, $options: 'i' } }).toArray();
      if (ans.length !== 0) {
        data.push(ans);
      }
    }

    let newarr = [].concat(...data);

    client.close();

    const keywordCounts = {};

    for (const obj of newarr) {
      const keyword = obj.keywords;

      if (keyword !== undefined) {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      }
    }

    const maxCount = Math.max(...Object.values(keywordCounts));
    const documentsWithMaxKeywords = newarr.filter(obj => obj.keywords && obj.keywords.split(' ').length >= maxCount);

    console.log('maxCount:', maxCount);
    console.log('Keyword counts:', keywordCounts);

    const descriptionToSend = documentsWithMaxKeywords.length > 0 ? documentsWithMaxKeywords[1].description : null;

    res.status(200).json({
      description_with_highest_keywords: descriptionToSend
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
