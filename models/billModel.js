var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var billModel = new Schema({
	name: {
		type: String
	},
	vendor: {
		type: String
	},
	description: {
		type: String
	},
	reference: {
		type: String
	},
	issueDate: {
		type: Date
	},
	dueAmount: {
		type: Number
	},
	dueDate: {
		type: Date
	},
	paidAmount: {
		type: Number
	},
	paidDate: {
		type: Number
	},
	notes: {
		type: Number
	}
}); 

module.exports = mongoose.model('Bill', billModel);