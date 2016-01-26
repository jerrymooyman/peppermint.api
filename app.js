var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	
var db = mongoose.connect('mongodb://localhost/peppermintApi');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var billRoutes = require('./routes/billRoutes')();
app.use('/api', billRoutes);

app.get('/', function(req, res) {
	res.send('welcome to my api');
});

app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});
