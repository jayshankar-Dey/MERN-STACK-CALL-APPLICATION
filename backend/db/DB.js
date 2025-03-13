const mongoose = require('mongoose')

const ConnectDb = async() => {
    await mongoose.connect(process.env.DB).then(() => {
        console.log('connection successfully'.bgCyan)
    }).catch((error) => {
        console.log(`error in mongoose connect ${error}`.bgRed)
    })
}

module.exports = ConnectDb