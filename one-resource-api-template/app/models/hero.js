const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		element: {
			type: String,
			enum: ['Fire', 'Water', 'Earth', 'Dark', 'Light', 'Basic'],
			default: 'Basic',
			required: true,
		},
		class: {
			// to make a sub doc for this or not...?
			// make virtuals to explain each class
			type: String,
			// don't know how to make only one option of a sub doc yet, so take up real-estate here
			enum: ['Warrior', 'Ranged Dealer', 'Support', 'Tanker'],
			default: 'Warrior',
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Hero', heroSchema)
