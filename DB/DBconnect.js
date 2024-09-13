const mongoose = require('mongoose')
require('dotenv').config()
const DBconnect = async () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_CONNECTIO_STRING)
    mongoose.connection
    .once('open',()=>console.log("MongoDB running"))
    .on('error',(err)=>console.log("MongoDB Error throw",err))
}
module.exports = DBconnect;