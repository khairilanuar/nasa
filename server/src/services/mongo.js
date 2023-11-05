const mongoose = require('mongoose')

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ok!')
})

mongoose.connection.on('error', (e) => {
    console.error(e)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        // no need on mongo 6
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
    })
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}