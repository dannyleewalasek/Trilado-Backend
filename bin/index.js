import Express from "express";
import cors from "cors";
import fetch from "node-fetch";
const app = Express();
app.use(cors());
app.get("/frequent", function (req, res) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7e17f5f817f9d34af0375bd12927021f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then((response) => response.json())
        .then((response) => {
        res.send(response.results);
    })
        .catch((err) => {
        res.send("error");
    });
});
app.get("/search", function (req, res) {
    console.log(req.query.query);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=7e17f5f817f9d34af0375bd12927021f&language=en-US&query=${req.query.query}&page=1&include_adult=false`)
        .then((response) => response.json())
        .then((response) => {
        res.send(response.results);
    })
        .catch((err) => {
        res.send("error");
    });
});
app.get("/recommend", function (req, res) {
    console.log(req.query.likedlist);
});
app.listen(3000);
