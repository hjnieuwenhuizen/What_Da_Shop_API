// mongodb/schemas/userSchema.js

const mongoose = require('mongoose');
const cartItemSchema = require('./cartItemSchema');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: [cartItemSchema],
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = userSchema;
