const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();

const filePath = "news.json";
const usersFilePath = "users.json";

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
    const newsType = req.query.newsType;

    const content = fs.readFileSync(filePath,"utf8");
    let news = JSON.parse(content);
    if(searchText) {
        news = news.filter(n => n.title.indexOf(searchText) != -1);
    }
    if(newsType && newsType !== '') {
        news = news.filter(n => n.type === newsType);
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

// получение информации о пользователе
app.get("/api/profileInfo", function(req, res) {  
    console.log("получение информации о пользователе");
    const login = req.query.login;

    const content = fs.readFileSync(usersFilePath,"utf8");
    let users = JSON.parse(content);
    let userInfo = {};
    if(login && login !== '') {
        userInfo = users.find(u => u.login === login)?.map(value => {
            value.firstname,
            value.lastname,
            value.email
        });
    }
    res.send(userInfo);
});

// вход в систему
app.post("/api/login", jsonParser, function(req, res) {

    console.log("вход в систему");
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;
      
    let data = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(data);
    let user = users.find(u => u.login === login && u.password === password);

    if(user) {
        user.auth = true;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(true);
    }
    else {
        res.status(404).send(login);
    }
});

// выход из системы
app.post("/api/logout", jsonParser, function(req, res) {

    console.log("выход из системы");
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
      
    let data = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(data);
    let user = users.find(u => u.login === login);

    if(user) {
        user.auth = false;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(true);
    }
    else {
        res.status(404).send(login);
    }
});

// проверка авторизации пользователя
app.get("/api/isAuth", function(req, res) {  
    console.log("проверка авторизации пользователя");
    const login = req.query.login;

    const content = fs.readFileSync(usersFilePath,"utf8");
    const users = JSON.parse(content);
    let user = users.find(u => u.login === login);
    let isAuth = user ? user.auth : false;
    res.send(isAuth);
});

// получение текущего пользователя
app.get("/api/currentUser", function(req, res) {  
    console.log("получение текущего пользователя");

    const content = fs.readFileSync(usersFilePath,"utf8");
    const users = JSON.parse(content);
    let user = users.find(u => u.auth);
    if(user) {
        res.send({
            login: user.login,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        });
    }
    else {
        res.send({
            login: ''
    
        })
    };
});

// изменение профиля
app.put("/api/users", jsonParser, function(req, res) {
    
    console.log("изменение профиля");
    console.log(req.body);

    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
      
    let data = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(data);
    let user = users.find(u => u.login === login);

    if(user) {
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        const userInfo = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
        res.send(userInfo);
    }
    else {
        res.status(404).send(login);
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
