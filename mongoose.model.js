var mongoose = require('mongoose');
var url = "mongodb://admin:Utno1985!@ds125335.mlab.com:25335/eden"

mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    PanelName: String,
    PanelId: Array,    
    status: Number,
    submittedDate: String,
    submittedUser: String,
    approvedDate: String,
    approvedUser: String,
    castDate: String,
    castUser: String,
    deliveredDate: String,
    deliveredUser: String,
    installedDate: String,
    installedUser: String
}, { collection: 'DB' });

var UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;