var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/peppermintApi');
var Bill = require('./models/billModel');

var app = express();

var port = process.env.PORT || 3000;

var billRouter = express.Router();

billRouter.route('/bills')
	.get(function(req, res) {
		var query = {};
		if (req.query) {
			query = req.query;
		}

		Bill.find(query, function(err, bills) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.json(bills);
			}
		});
	});

billRouter.route('/bills/:billid')
	.get(function(req, res) {
		Bill.find(req.params.billid, function(err, bill) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.json(bill);
			}
		});
	});

app.use('/api', billRouter);

app.get('/', function(req, res) {
	res.send('welcome to my api');
});

app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});
