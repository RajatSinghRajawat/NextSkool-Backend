const mongoose = require('mongoose')

const connect_DB = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB')
}).catch((error) => {
    console.log(error)
});


module.exports = { connect_DB };