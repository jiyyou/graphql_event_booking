const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdEvents: [
		{
			type: Schema.Types.ObjectId, //objectID of all events created by this user
			ref: 'Event' //from Event model
		}
	]
});

module.exports = mongoose.model('User', userSchema);