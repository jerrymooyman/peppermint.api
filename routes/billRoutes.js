var express = require('express');

var routes = function(Bill) {

	Bill.prototype.copy = function(source) {
		this.name = source.name;
		this.vendor = source.vendor;
		this.description = source.description;
		this.reference = source.reference;
		this.issueDate = source.issueDate;
		this.dueAmount = source.dueAmount;
		this.dueDate = source.dueDate;
		this.paidAmount = source.paidAmount;
		this.paidDate = source.paidDate;
		this.notes = source.notes;
	};

	var billRouter = express.Router();
	var billController = require('../controllers/billController')(Bill);

	billRouter.route('/')
		.post(billController.post)
		.get(billController.get);

	billRouter.use('/:billid', function(req, res, next) {
		Bill.findById(req.params.billid, function(err, bill) {
			if(err) {
				res.status(500).send(err);
			} else if(bill) {
				req.bill = bill;
				next();
			} else {
				res.status(404).send('no bill found');
			}
		});
	});

	billRouter.route('/:billid')
		.get(function(req, res) {
			res.status(200).json(req.bill);
		})
		.put(function(req, res) {
			req.bill.copy(req.body);
			req.bill.save(function(err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).json(req.bill);
				}
			});
		})
		.patch(function (req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			for(var p in req.body) {
				req.bill[p] = req.body[p];	
			}
			req.bill.save(function(err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).json(req.bill);
				}
			});
		})
		.delete(function(req, res) {
			req.bill.remove(function(err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(204).send('Removed');
				}
			});
		});

	return billRouter;
}

module.exports = routes;