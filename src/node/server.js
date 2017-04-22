const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoDB = require('./Mongo').Mongo;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

const mongoDB = new MongoDB();
const creationLinkUrl = 'http://localhost:3000/';

app.post('/addShortLink', (req, res) => mongoDB.addLink(req.body.link, response => res.send(response)));
app.get('/link/*', (req, res) => {
	mongoDB.getLink(req.protocol + '://' + req.get('host') + req.originalUrl, (link, err) => {
		if (err) {
			res.writeHead(301, {Location: creationLinkUrl});
			res.send();
			return
		}
		res.writeHead(301, {Location: link});
		res.send();
	});
});

app.listen(3001);
console.log('Listening on port 3001...');
