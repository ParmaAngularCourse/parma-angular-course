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
  res.send(news);
});

// Добавление новости
app.post("/api/news", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const text = req.body.text;
  const title = req.body.title;
  const date = req.body.date;
  const tag = req.body.tag;
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
  existedRecords.push(record);
  data = JSON.stringify(existedRecords); // перезаписываем файл с новыми данными
  fs.writeFileSync(filePath, data);
  res.sendStatus(200);
});

// удаление новости
app.delete("/api/news", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const keys = req.body.keys;
  console.log(keys);
  let data = fs.readFileSync(filePath, "utf8");
  let news = JSON.parse(data);

  let filteredNews = news.filter((x) => !keys.includes(x.id));
  data = JSON.stringify(filteredNews);
  fs.writeFileSync(filePath, data); // отправляем удаленную новость
  res.sendStatus(200);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
