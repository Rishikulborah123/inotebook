const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const connectToMongo = async () => {
    await mongoose.connect(mongoURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connectToMongo;