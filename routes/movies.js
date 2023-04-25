var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movies.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('searchPage.ejs');
});

{/* <form action="/movieSearch" method="post"></form> */}
router.post('/searchResults', movieController.fetchMoviesList)

// <a href="/movie/<%= m.imdbID %>"><button>See Movie Details</button></a>
router.get('/movie/:imdbID', movieController.fetchMovieDetails)


//  <form action="/movie/<%= movie.imdbID %>" method="POST">
router.post('/movie/:imdbID', movieController.addMovieToFavorites)


//route for favoriteMoviesList
router.get('/favoriteMoviesList', movieController.favoriteMoviesList)

//<form action="/movie/<%= m._id %>" method="DELETE">
router.delete('/movie/:mongoID', movieController.removeMovieFromFavorites)






module.exports = router;
