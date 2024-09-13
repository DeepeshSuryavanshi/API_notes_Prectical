const mongoose = require('mongoose')

const DBconnect = async () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/pr_notes?retryWrites=true&w=majority')
    mongoose.connection
    .once('open',()=>console.log("MongoDB running"))
    .on('error',(err)=>console.log("MongoDB Error throw",err))
}
module.exports = DBconnect;