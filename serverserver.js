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

//#region Get Status 1 to 5 .......................................

app.get('/get-Status1', (req, res) => {
  UserData.find({ status: 1 }).then(function (doc) {
    res.send(doc.map(document => document.PanelId));
  });
});

app.get('/get-Status2', (req, res) => {
  UserData.find({ status: 2 }).then(function (doc) {
    res.send(doc.map(document => document.PanelId));
  });
});

app.get('/get-Status3', (req, res) => {
  UserData.find({ status: 3 }).then(function (doc) {
    res.send(doc.map(document => document.PanelId));
  });
});

app.get('/get-Status4', (req, res) => {
  UserData.find({ status: 4 }).then(function (doc) {
    res.send(doc.map(document => document.PanelId));
  });
});

app.get('/get-Status5', (req, res) => {
  UserData.find({ status: 5 }).then(function (doc) {
    res.send(doc.map(document => document.PanelId));
  });
});

//#endregion

//#region update All................................................

app.put('/updateAll', (req, res) => {

  UserData.update({},
    {
      status: 0,
      submittedDate: "",
      submittedUser: "",
      approvedDate: "",
      approvedUser: "",
      castDate: "",
      castUser: "",
      deliveredDate: "",
      deliveredUser: "",
      installedDate: "",
      installedUser: ""

    }, { multi: true }, function (err, doc) {
      if (err) {
        return res.send(err);
      }
      res.send(doc);
    });
});

//#endregion

function calcTime() {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000 * 8));
  var updateDate = nd.toLocaleDateString() + "T" + (nd.toLocaleTimeString());
  return updateDate;
}

io.sockets.on('connection', function (socket) {
  console.log('connected!');

  setInterval(function() {
    socket.emit('cow', "Data!");
  }, 3000 * 30 * 60); 

  //#region Update Status 1 to 5....................................

  app.put('/update-Status1', (req, res) => {

    var panelName = req.body.PanelName;

    UserData.find({ PanelName: panelName }, function (err, doc) {

      if (doc.length === 0) {
        return res.status(404).send("Panel Name Not Found!");
      }

      var a = (doc[0].status);
      var b = (doc[0].PanelId);     

      if ((a + 1) == 1) {
        UserData.update({ PanelName: panelName }, { status: 1, submittedDate: calcTime() }, function (err, doc) {
          if (err) {
            return res.status(404).send("Update Fail!");
          }
          socket.broadcast.emit('status1', b);
          res.status(200).send("Update Succeeded!");
        });
      } else {
        if (a >= 1) {
          return res.status(404).send("Already Updated!");
        }
        return res.status(404).send("Update Fail!");
      }
    });
  });

  app.put('/update-Status2', (req, res) => {

    var panelName = req.body.PanelName;

    UserData.find({ PanelName: panelName }, function (err, doc) {

      if (doc.length === 0) {
        return res.status(404).send("Panel Name Not Found!");
      }

      var a = (doc[0].status);
      var b = (doc[0].PanelId);

      if ((a + 1) == 2) {
        UserData.update({ PanelName: panelName }, { status: 2, approvedDate: calcTime() }, function (err, doc) {
          if (err) {
            return res.status(404).send("Update Fail!");
          }
          socket.broadcast.emit('status2', b);
          res.status(200).send("Update Succeeded!");
        });
      } else {
        if (a >= 2) {
          return res.status(404).send("Already Updated!");
        }
        return res.status(404).send("Update Fail!");
      }
    });
  });

  app.put('/update-Status3', (req, res) => {

    var panelName = req.body.PanelName;

    UserData.find({ PanelName: panelName }, function (err, doc) {

      if (doc.length === 0) {
        return res.status(404).send("Panel Name Not Found!");
      }

      var a = (doc[0].status);
      var b = (doc[0].PanelId);

      if ((a + 1) == 3) {
        UserData.update({ PanelName: panelName }, { status: 3, castDate: calcTime() }, function (err, doc) {
          if (err) {
            return res.status(404).send("Update Fail!");
          }
          socket.broadcast.emit('status3', b);
          res.status(200).send("Update Succeeded!");
        });
      } else {
        if (a >= 3) {
          return res.status(404).send("Already Updated!");
        }
        return res.status(404).send("Update Fail!");
      }
    });
  });

  app.put('/update-Status4', (req, res) => {

    var panelName = req.body.PanelName;
    var updateDate = new Date().toJSON();

    UserData.find({ PanelName: panelName }, function (err, doc) {

      if (doc.length === 0) {
        return res.status(404).send("Panel Name Not Found!");
      }

      var a = (doc[0].status);
      var b = (doc[0].PanelId);

      if ((a + 1) == 4) {
        UserData.update({ PanelName: panelName }, { status: 4, deliveredDate: calcTime() }, function (err, doc) {
          if (err) {
            return res.status(404).send("Update Fail!");
          }
          socket.broadcast.emit('status4', b);
          res.status(200).send("Update Succeeded!");
        });
      } else {
        if (a >= 4) {
          return res.status(404).send("Already Updated!");
        }
        return res.status(404).send("Update Fail!");
      }
    });
  });

  app.put('/update-Status5', (req, res) => {

    var panelName = req.body.PanelName;
    var updateDate = new Date().toJSON();

    UserData.find({ PanelName: panelName }, function (err, doc) {

      if (doc.length === 0) {
        return res.status(404).send("Panel Name Not Found!");
      }

      var a = (doc[0].status);
      var b = (doc[0].PanelId);

      if ((a + 1) == 5) {
        UserData.update({ PanelName: panelName }, { status: 5, installedDate: calcTime() }, function (err, doc) {
          if (err) {
            return res.status(404).send("Update Fail!");
          }
          socket.broadcast.emit('status5', b);
          res.status(200).send("Update Succeeded!");
        });
      } else {
        if (a == 5) {
          return res.status(404).send("Already Updated!");
        }
        return res.status(404).send("Update Fail!");
      }
    });
  });

  //#endregion

});
//#endregion

module.exports = { app };