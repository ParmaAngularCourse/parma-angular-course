const express = require("express");
const fs = require("fs");    
const app = express();
const PORT = 8080;
const cors = require('cors');
app.use(cors())

const jsonParser = express.json();  
const filePath = "news.json";
app.get("/api/news", function(req, res) {           
    const content = fs.readFileSync(filePath, "utf8");    
    const news = JSON.parse(content);    
    res.send(news);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`))