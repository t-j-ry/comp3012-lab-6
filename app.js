/*
 Authors: Tim Ryan
 Your name and student #: A01252402
*/
const fs = require('fs');
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  movieList = ''
  res.render("pages/index", {movieList})
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here
  let movieList = req.body.movieList.split(',')
  res.render("pages/index.ejs", { movieList }) 
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movieList = [] // empty array for incoming params...
  // req.quesry => movie1 and movie2
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2

  movieList.push(movie1, movie2) // push them to the array
  // render index.ejs with movieList array
  res.render("pages/index.ejs", {movieList})
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieSearch = req.params.movieName
  fs.readFile('./movieDescriptions.txt','utf8',(err, data) => {
    if (err) { return console.log(err)}
    data.split('\n').forEach(element => {
      // console.log(element.toLowerCase().includes(movieSearch.toLowerCase()))
      if (element.toLowerCase().includes(movieSearch.toLowerCase())) {
        let movieList = element.split(':')
        res.render("pages/searchResult.ejs", {movieList})
      } else {
        let movieList = ['',"Movie could not be found"]
        res.render("pages/searchResult.ejs", {movieList})
      }
    });
  })
  

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});