var mongoose = require('mongoose');
var url = "mongodb://admin:Utno1985!@ds135757.mlab.com:35757/funding"

mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    UserName: String,
    UserId: Number         
}, { collection: 'DB' });

var UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;