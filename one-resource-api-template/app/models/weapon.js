// every hero needs a weapon, usually.
// weapon is a subdoc of hero

const mongoose = require('mongoose')

const weaponSchema = new mongoose.Schema({
    weapon: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    element: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        enum: ['Warrior', 'Ranged Dealer', 'Support', 'Tanker'],
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
    return `${this.weapon} should be equipped by a ${this.requirements} to be most effective.`
})

module.exports = weaponSchema