import Express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import { createRequire } from "module";
import * as fs from "fs";
import dotenv from "dotenv";
import testConnection from "./databasemanagement";

dotenv.config();
const app = Express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const apiKey = process.env.PASSWORD;
app.get("/frequent", function (req: Express.Request, res: Express.Response) {
  testConnection();
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
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
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${req.query.query}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response: any) => {
      res.send(response.results);
    })
    .catch((err) => {
      res.send("error");
    });
});

app.get(
  "/recommend",
  function (req: Express.Request, res: Express.Response) {}
);

app.listen(PORT, () => console.warn(`listenign on ${PORT}`));
