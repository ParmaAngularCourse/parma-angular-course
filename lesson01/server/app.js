const express = require("express");
const fs = require("fs");

const objectsFileBd = "objects.json";
const tagsFileBd = "tags.json";
const personFileBd = "person.json";

const app = express();
const jsonParser = express.json();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, AuthToken");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get("/api/tags", (req, res) => {
  let content = fs.readFileSync(tagsFileBd, "utf8");
  return res.json(JSON.parse(content));
});

app.get("/api/news", (req, res) => {
  console.log("====get=>");

  let searchString = req.query?.s ?? "";
  let selectedTag = req.query?.t ?? "";
  let filteredData = [];

  let content = fs.readFileSync(objectsFileBd, "utf8");
  let data = JSON.parse(content);

  if(searchString.length === 0){
    console.log("all");
    filteredData = data;
  } else {
    console.log("searchString:>" + searchString + "<");
    filteredData = data.filter(p => p.head.toUpperCase().indexOf(searchString.toUpperCase(), 0) > -1)
  }

  if(selectedTag.length !== 0 ){
    console.log("selectedTag:>" + selectedTag + "<");
    filteredData = filteredData.filter(p => p.tag === selectedTag)
  }

  return res.json(filteredData);
});

app.delete("/api/news/:id", (req, res) => {
  console.log("====delete=>");
  console.log("id:" + req.params.id);

  let id = req.params.id;
  let content = fs.readFileSync(objectsFileBd, "utf8");
  let data = JSON.parse(content);
  let index = data.findIndex(p => p.id == id);
  if(index > -1){
    data.splice(index, 1);
    content = JSON.stringify(data);
    fs.writeFileSync(objectsFileBd, content);
    return res.send();
  } else {
    return res.sendStatus(404);
  }
});

app.put("/api/news", jsonParser, (req, res) => {
  console.log("====put=>");

  if(!req.body) {
    console.log("sendStatus: 400");
    return res.sendStatus(400);
  }

  let item = req.body;
  console.log(item);

  let content = fs.readFileSync(objectsFileBd, "utf8");
  let data = JSON.parse(content);
  let maxId = data
    .map((v) => { return v.id;})
    .sort()[data.length - 1];
  maxId = maxId === undefined ? 1 : maxId;
  item.id = maxId + 1;

  data.push(item);
  content = JSON.stringify(data);
  fs.writeFileSync(objectsFileBd, content);

  return res.send(item);
})

app.post("/api/news", jsonParser, (req, res) => {
  console.log("====post=>");

  if(!req.body) {
    console.log("sendStatus: 400");
    return res.sendStatus(400);
  }

  let item = req.body;
  console.log(item);

  let content = fs.readFileSync(objectsFileBd, "utf8");
  let data = JSON.parse(content);
  let oldItem = data.find(p => p.id == item.id)
  if(oldItem) {
    oldItem.date = item.date;
    oldItem.head = item.head;
    oldItem.desc = item.desc;
    oldItem.tag = item.tag;
    content = JSON.stringify(data);
    fs.writeFileSync(objectsFileBd, content);
    return res.send(oldItem);
  } else {
    return res.sendStatus(404);
  }
});

app.get("/api/personinfo", (req, res) => {
  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);

  if(!data.isAuth){
    return res.sendStatus(401);
  }

  return res.send(data.personInfo);
});

app.post("/api/personinfo", jsonParser, (req, res) => {
  if(!req.body) {
    console.log("sendStatus: 400");
    return res.sendStatus(400);
  }

  let personInfo = req.body;
  console.log(personInfo);

  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);

  if(!data.isAuth){
    return res.sendStatus(401);
  }

  data.personInfo = personInfo;
  content = JSON.stringify(data);
  fs.writeFileSync(personFileBd, content);

  return res.send();
});

app.get("/api/permissions", (req, res) => {
  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);

  if(!data.isAuth){
    return res.sendStatus(401);
  }

  return res.send(data.permissions);
});

app.post("/api/login", jsonParser, (req, res) => {
  if(!req.body) {
    console.log("sendStatus: 400");
    return res.sendStatus(400);
  }

  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);

  let loginInfo = req.body;
  if(loginInfo.login != data.login){
    return res.status(403).send("Пользователь не найден");
  }
  if(loginInfo.password != data.password){
    return res.status(403).send("Пароль неверный");
  }

  data.isAuth = true;
  content = JSON.stringify(data);
  fs.writeFileSync(personFileBd, content);

  return res.send(data.authToken);
});

app.get("/api/logout", (req, res) => {
  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);
  data.isAuth = false;
  content = JSON.stringify(data);
  fs.writeFileSync(personFileBd, content);

  return res.send();
});

app.get("/api/isauth", (req, res) => {
  let content = fs.readFileSync(personFileBd, "utf8");
  let data = JSON.parse(content);
  if(data.isAuth)
    return res.send(data.authToken);
  else
    return res.send();
});

app.listen(3000, ()=>console.log("Сервер запущен..."));
