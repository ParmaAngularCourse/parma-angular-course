const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const jsonParser = express.json();
const filePath = "news.json";

// Получение новостей
app.get("/api/news", jsonParser, function (req, res) {
  const content = fs.readFileSync(filePath, "utf8");
  const news = JSON.parse(content);
  console.log("Read " + JSON.stringify(news));
  res.send(news);
});

// Получение новостей по фильтру
app.get("/api/news/find", jsonParser, function (req, res) {
  if (!req.query) return res.sendStatus(400);
  let clause = req.query.clause;
  console.log(clause);
  const content = fs.readFileSync(filePath, "utf8");
  const news = JSON.parse(content);
  const newsFiltered = news.filter((x) => x.title.includes(clause));
  console.log("Read " + JSON.stringify(newsFiltered));
  res.send(newsFiltered);
});

// Добавление новости
app.post("/api/news", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let bodyValue = req.body.body;
  const text = bodyValue.text;
  const title = bodyValue.title;
  const date = bodyValue.date;
  const tag = bodyValue.tag;
  let record = {
    text: text,
    title: title,
    date: date,
    tag: tag,
  };

  let data = fs.readFileSync(filePath, "utf8");
  let existedRecords = JSON.parse(data); // находим максимальный id
  const id = Math.max.apply(
    Math,
    existedRecords.map(function (o) {
      return o.id;
    })
  ); // увеличиваем его на единицу
  record.id = id + 1; // добавляем новости в массив

  console.log("Add " + JSON.stringify(record));

  existedRecords.push(record);
  data = JSON.stringify(existedRecords); // перезаписываем файл с новыми данными
  fs.writeFileSync(filePath, data);
  res.sendStatus(200);
});

// удаление новости
app.delete("/api/news", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const keys = req.body.keys;
  console.log("Deleted " + keys);
  let data = fs.readFileSync(filePath, "utf8");
  let news = JSON.parse(data);

  let filteredNews = news.filter((x) => !keys.includes(x.id));
  data = JSON.stringify(filteredNews);
  fs.writeFileSync(filePath, data); // отправляем удаленную новость
  res.sendStatus(200);
});

// обновление новости
app.put("/api/news", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let data = fs.readFileSync(filePath, "utf8");
  let news = JSON.parse(data);

  let bodyValue = req.body.body;
  const text = bodyValue.text;
  const title = bodyValue.title;
  const date = bodyValue.date;
  const tag = bodyValue.tag;
  const id = bodyValue.id;
  let record = {
    text: text,
    title: title,
    date: date,
    tag: tag,
    id: id,
  };

  for (var i = 0; i < news.length; i++) {
    if (news[i].id == record.id) {
      news[i] = record;
    }
  }
  console.log("Updated " + JSON.stringify(record));

  data = JSON.stringify(news);
  fs.writeFileSync(filePath, data); // отправляем удаленную новость
  res.sendStatus(200);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
