const axios = require('axios')
const Movie = require('../models/Movie')

function fetchMoviesList(req, res) {
    // My OMDb API Key: 9fc11b9b
    // https://www.omdbapi.com/?apikey=9fc11b9b&s=dogs&page=2
    // Store the request body (a.k.a. Form Data a.k.a movieQuery) in a variable
    let movieQuery = req.body.movieQuery
    // Make an API call to the movie Database with our user's movieQuery
        // We can either use fetch() or axios() to make the API call
    // Will make an HTTP call to the pokemon API Server 
    axios.get(`https://www.omdbapi.com/?apikey=9fc11b9b&s=${movieQuery}`)
        .then(APIResponse => APIResponse.data) // Axios feature -> grab the data property
        .then(moviesList => {
            // Render the moviesList.ejs and pass to it the API data (a.k.a list of movie data)

    // Store the API data into a variable
            console.log(moviesList)
            res.render('searchResults.ejs', {moviesList: moviesList.Search})

        })
    // Please display a list of all the movies with the following information:
        // Title
        // Year
        // The Poster Image
}

function addMovieToFavorites(req,res){
    const imdbID = req.params.imdbID
    const APIKey = '9fc11b9b'
    const omdbAPIUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKey}`
    axios.get(omdbAPIUrl).then(response => response.data)
    .then(movieDetail => {
        const movieObj = {
            Title: movieDetail.Title,
            Year: movieDetail.Year,
            Genre: movieDetail.Genre,
            Actors: movieDetail.Actors,
            Plot: movieDetail.Plot,
            Poster: movieDetail.Poster,
        }
        Movie.create(movieObj).then((mov) => console.log(
            'Movie added to favorites'))
            .then(() => res.redirect('/favoriteMoviesList'))
    })

}

//Exercise
function movieDetailHelper(imdbID){
    //fetch movie deatil from api
    //
}

function fetchMovieDetails(req, res){
    //store imdbID in a variable from req.params
    const imdbID = req.params.imdbID
    const APIKey = '9fc11b9b'
    //use the imdbID to make and API call and retrieve the details of that 
    // specific movie
    const omdbAPIUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKey}`
    axios.get(omdbAPIUrl).then(response => response.data)
    .then(movie => {
        console.log("API movie details running")
        console.log(movie)
        res.render("movieDetails.ejs", {movie: movie})
    })

}


async function favoriteMoviesList(req, res){
    const movieData = await Movie.find({})
    console.log(movieData)
    res.render('favoriteMoviesList.ejs', {movieData: movieData})
}


function removeMovieFromFavorites(req, res){
    //store mongoID of movie
    const mongoID = req.params.mongoID
    //removemovie from favorites database
    Movie.findByIdAndDelete(mongoID).then(dbResponse =>{
        //redirect to favoritemovieslist
    res.redirect('/favoriteMoviesList')
    })
    
}

module.exports = {
    fetchMoviesList,
    fetchMovieDetails,
    addMovieToFavorites,
    favoriteMoviesList,
    removeMovieFromFavorites
}

