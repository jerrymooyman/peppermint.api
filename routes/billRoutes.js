var express = require('express');


var routes = function() {
	var billRouter = express.Router();
	var Bill = require('../models/billModel');

	billRouter.route('/bills')
		.post(function(req, res) {
			var bill = new Bill(req.body);
			bill.save();
			res.status(201).send(bill);
		})
		.get(function(req, res) {
			var query = {};
			if (req.query) {
				query = req.query;
			}
			console.log(query);
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
			console.log(req.params.billid);
			Bill.findById(req.params.billid, function(err, bill) {
				if(err) {
					res.status(500).send(err);
				} else {
					console.log(bill);
					res.status(200).json(bill);
				}
			});
		});

	return billRouter;
}

module.exports = routes;