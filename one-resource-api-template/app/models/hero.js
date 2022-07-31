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
			// don't know how to make only one option of a sub doc yet, so take up real-estate and squat here
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
		toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

// virtuals go here

// include element triangles
heroSchema.virtual('elementTriangle').get(function () {
    if (this.element === 'Fire') {
		return `${this.name} is strong against Earth attributes, but weak against Water attributes.`
	} else if (this.element === 'Water') {
		return `${this.name} is strong against Fire attributes, but weak against Earth attributes.`
	} else if (this.element === 'Earth') {
		return `${this.name} is strong against Water attributes, but weak against Fire attributes.`
	} else if (this.element === 'Dark') {
		return `${this.name} is strong against Basic attributes, but weak against Light attributes.`
	} else if (this.element === 'Light') {
		return `${this.name} is strong against Dark attributes, but weak against Basic attributes.`
	} else if (this.element === 'Basic') {
		return `${this.name} is strong against Light attributes, but weak against Dark attributes.`
	} else {
		return "Every hero needs an attributed element!"
	}
})

// class descriptions 
heroSchema.virtual('classDescription').get(function () {
    if (this.class === 'Warrior') {
        return "Class well balanced and usable in many ways. Equips melee weapons."
    } else if (this.class === 'Ranged Dealer') {
        return "Class that attacks enemies with ranged weapons, such as rifles, bows, magic staff, etc."
    } else if (this.class === 'Support') {
        return "Class that debuffs enemies and strengthens and/or heals fellow heroes."
    } else if (this.class === 'Tanker') {
        return "Class that lures enemies and protects fellow heroes, based on their solid defenses and HP."
    } else {
		return "What is a hero without class? A wannabe."
	}
})

module.exports = mongoose.model('Hero', heroSchema)
