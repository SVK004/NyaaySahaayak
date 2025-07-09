const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../passwords");

function normalLoginMiddleware(req,res,next){
      try{
      const token = req.body.token;
      const words = token.split();
      console.log(words);
      const originalToken = words[1];
      const decodedToken = jwt.verify(originalToken);
      if(decodedToken){
            res.username = decodedToken.username;
            res.email = decodedToken.email;
            next();
      }else{
            res.status(403).json({
                  msg: "You are not authenticated"
            })
      }
}catch(e){
      res.status(411).json({
            msg: "Your authentication token is wrong"
      })
}
}
module.exports = normalLoginMiddleware;