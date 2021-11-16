import Express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import { insertLikes } from "./databasemanagemet";
const bodyParser = require("body-parser");
const url = require("url");

const app = Express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/frequent", function (req: Express.Request, res: Express.Response) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7e17f5f817f9d34af0375bd12927021f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
    .then((response) => response.json())
    .then((response: any) => {
      res.send(response.results);
    })
    .catch((err) => {
      res.send("error");
    });
});

app.get("/search", function (req: Express.Request, res: Express.Response) {
  console.log(req.query.query);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=7e17f5f817f9d34af0375bd12927021f&language=en-US&query=${req.query.query}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response: any) => {
      res.send(response.results);
    })
    .catch((err) => {
      res.send("error");
    });
});

app.get("/recommend", function (req: Express.Request, res: Express.Response) {
  const { likedlist } = req.query as string;
  console.log(JSON.parse(req.query.likedlist));
  const likedlist = req.query;
  const likes = JSON.parse(likedlist as any);
  console.log(likes.join(""));
});

app.listen(3000);
