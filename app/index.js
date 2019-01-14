  var express = require('express');
  const PORT = process.env.PORT || 5000
  var app = express();

  app.get('/', function (req, res) {
    res.send('Be prepared, AquaQAPP is coming.');
  });
  app.listen(PORT, function () {
    console.log(`Example app listening on port ${ PORT }.`);
  });
