var billController = function(Bill) {

	var post = function(req, res) {
		var bill = new Bill(req.body);
		bill.save(function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(bill);
			}
		});
	}

	var get = function(req, res) {
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
	}

	return {
		post: post,
		get: get
	}
}

module.exports = billController;