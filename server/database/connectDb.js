const mongoose = require('mongoose')

MONGO_URI = "mongodb://localhost:27017/SastaCodeChef"

const connectDb = async () => {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(conn.connection.host)
}
module.exports = connectDb;


