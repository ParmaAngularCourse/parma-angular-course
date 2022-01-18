const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();

const filePath = "news.json";

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// получение списка новостей
app.get("/api/news", function(req, res) {  
    console.log("получение списка новостей");
    const searchText = req.query.searchText;

    const content = fs.readFileSync(filePath,"utf8");
    let news = JSON.parse(content);
    if(searchText) {
        news = news.filter(n => n.title.indexOf(searchText) != -1);
    }
    res.send(news);
});

// получение новости по id
app.get("/api/news/:id", function(req, res) {

    console.log("получение новости по id");

    const id = req.params.id;
    console.log(id);

    const content = fs.readFileSync(filePath, "utf8");
    const news = JSON.parse(content);
    let newsItem = news.find(n => n.id == id);

    if(newsItem){
        res.send(newsItem);
    }
    else{
        res.status(404).send();
    }
});

// удаление новости по id
app.delete("/api/news/:id", function(req, res) {
    
    console.log("удаление новости по id");

    const id = req.params.id;
    console.log(id);

    let data = fs.readFileSync(filePath, "utf8");
    let news = JSON.parse(data);
    let index = news.findIndex(n => n.id == id);

    if(index > -1) {
        const newsItem = news.splice(index, 1)[0];
        data = JSON.stringify(news);
        fs.writeFileSync("news.json", data);
        res.send(newsItem);
    }
    else{
        res.status(404).send();
    }
});

// изменение новости
app.put("/api/news", jsonParser, function(req, res) {
    
    console.log("изменение новости");
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);

    const newsId = req.body.id;
    const newsDate = req.body.date;
    const newsTitle = req.body.title;
    const newsText = req.body.text;
    const newsType = req.body.type;
      
    let data = fs.readFileSync(filePath, "utf8");
    const news = JSON.parse(data);
    let newsItem = news.find(n => n.id == newsId);

    if(newsItem) {
        newsItem.date = newsDate;
        newsItem.title = newsTitle;
        newsItem.text = newsText;
        newsItem.type = newsType;
        data = JSON.stringify(news);
        fs.writeFileSync("news.json", data);
        res.send(newsItem);
    }
    else {
        res.status(404).send(newsItem);
    }
});

// добавление новости
app.post("/api/news", jsonParser, function(req, res) {

    console.log("добавление новости");
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);

    const newsId = req.body.id;
    const newsDate = req.body.date;
    const newsTitle = req.body.title;
    const newsText = req.body.text;
    const newsType = req.body.type;
      
    let data = fs.readFileSync(filePath, "utf8");
    const news = JSON.parse(data);
    let newsItem = news.find(n => n.id == newsId);

    if(!newsItem) {
        newsItem = {
            id: newsId,
            date: newsDate,
            title: newsTitle,
            text: newsText,
            type: newsType
        };
        news.push(newsItem);
        data = JSON.stringify(news);
        fs.writeFileSync("news.json", data);
        res.send(newsItem);
    }
    else {
        res.status(404).send(newsItem);
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
