const express = require("express");

const data = [{
    "id": 1,
    "date": "2020-12-31T19:00:01.000Z",
    "head": "новость #1",
    "desc": "Текст новости #1",
    "tag": "politic",
    "timeZoneMinutes": 300
  }, {
    "id": 2,
    "date": "2021-01-31T19:00:02.000Z",
    "head": "Новость #2",
    "desc": "Текст новости #2",
    "tag": "internet",
    "timeZoneMinutes": 300
  }, {
    "id": 3,
    "date": "2021-02-28T19:00:03.000Z",
    "head": "Новость #3",
    "desc": "Текст новости #3",
    "tag": "science",
    "timeZoneMinutes": 300
  }, {
    "id": 4,
    "date": "2021-03-31T19:00:04.000Z",
    "head": "Новость #4",
    "desc": "Текст новости #4",
    "tag": "tourism",
    "timeZoneMinutes": 300
  }];


const app = express();

const jsonParser = express.json();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get("/api/tags", (req, res) => {
  res.json([
    {tag: "politic", text: "Политика", color: "#58B957"},
    {tag: "tourism", text: "Туризм", color: "#55BFE0"},
    {tag: "economy", text: "Экономика", color: "#EFAC43"},
    {tag: "science", text: "Наука", color: "#3D8BCD"},
    {tag: "internet", text: "Интернет", color: "#999999"}
  ]);
});

app.get("/api/news", (req, res) => {
  console.log("====get=>");
  console.log("all");
  res.json(data);
});

app.delete("/api/news/:id", (req, res) => {
  console.log("====delete=>");
  console.log("id:" + req.params.id);
  res.send();
});

app.put("/api/news", jsonParser, (req, res) => {
  let v = req.body;
  v.id = 100;
  console.log("====put=>");
  console.log(v);
  res.send(v);
})

app.post("/api/news", jsonParser, (req, res) => {
  let v = req.body;
  console.log("====post=>");
  console.log(v);
  res.send(v);
});

app.listen(3000);
