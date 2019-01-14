const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

require('./routes/qappRoutes')(app);

app.use(express.static('./app/public'));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
