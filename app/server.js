const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/qappRoutes')(app);

var static_options = {
    index: "test.html"
};

app.use('/', express.static('./app/public', static_options));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
