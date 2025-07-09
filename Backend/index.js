const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const normalLoginRoutes = require('./routes/server');

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/',normalLoginRoutes);


app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });