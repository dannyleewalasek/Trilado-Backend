import Express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as fs from "fs";
const app = Express();
app.use(cors());
// fs.writeFile("text.txt", "something", () => {
//   console.log("succesful");
// });
let apiKey = undefined;
fs.readFile("bin/apikey.txt", "utf8", function (err, data) {
  if (err) {
    return console.error(err);
  }
  apiKey = data;
});
app.get("/frequent", function (req, res) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
    .then((response) => response.json())
    .then((response) => {
      res.send(simplifyJson(response.results));
    })
    .catch((err) => {
      res.send("error");
    });
});
app.get("/search", function (req, res) {
  console.log(req.query.query);
  console.log(apiKey);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${req.query.query}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response) => {
      res.send(simplifyJson(response.results));
    })
    .catch((err) => {
      res.send("error");
    });
});
app.get("/recommend", function (req, res) {});
app.listen(3000);

const simplifyJson = function (filmJSON) {
  let simplified = [];

  for (let key in filmJSON) {
    simplified.push({
      original_title: filmJSON[key].original_title,
      id: filmJSON[key].id,
      poster_path: filmJSON[key].poster_path,
      release_date: filmJSON[key].release_date,
    });
  }
  console.log(simplified);
  return simplified;
};
