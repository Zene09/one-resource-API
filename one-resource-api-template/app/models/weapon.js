// every hero needs a weapon, usually.
// weapon is a subdoc of hero

const mongoose = require('mongoose')

const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    element: {
        type: String,
        enum: ['Fire', 'Water', 'Earth', 'Dark', 'Light', 'Basic'],
        default: 'Basic',
        required: true,
    },
    requirements: {
        type: String,
        enum: ['Warrior', 'Ranged Dealer', 'Support', 'Tanker'],
        default: 'Warrior',
        required: true
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

// weapon virtuals here
// give description that this weapon should go to a specific class
weaponSchema.virtual('classRequirements').get(function () {
    return `${this.name} should be equipped by a ${this.requirements} to be most effective.`
})

module.exports = weaponSchema