var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var UserData = require('./mongoose.model');
var app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.set('port', port);
app.use('/', express.static(__dirname + '/www'));

server.listen(port, () => {
  console.log('Server is up');
});

//#region API......................................................

app.put('/update-Status', (req, res) => {

  var userID = req.body.UserId;

  UserData.find({ UserId: userID }, function (err, doc) {

    if (doc.length === 0) {
      return res.status(404).send("fail");
    } else {
      res.status(200).send("success")
    }

  });
});

//#endregion

module.exports = { app };