const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/inotes "

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Hello..., we are now connected to MongoDB")
    })
}

module.exports = connectToMongo;