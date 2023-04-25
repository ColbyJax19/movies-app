const mongoose = require('mongoose')
// import mongoose from 'mongoose'

function connectToDatabase(){
    mongoose.connect('mongodb://127.0.0.1:27017/movies')

    //initialize connection to db
    const db = mongoose.connection

    //add listener for connection event
    db.on('connected', () => {
        console.log("Connected to MongoDB")
    })
}



module.exports = {
    connectToDatabase
}