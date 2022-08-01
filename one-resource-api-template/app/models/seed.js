// seed.js is going to be the file we run whenever we want to seed our database, we'll create a bunch of pets at once

// we want to be careful with this, because when we run it it'll delete all of the pets in the db

// we can modify this later to only delete pets that don't have an owner already, but we'll keep it simple for now

const mongoose = require('mongoose')
const Hero = require('./hero')
const db = require('../../config/db')

const startHeroes = [
    {name: 'Zen', element: 'Basic', class: 'Warrior'},
    {name: 'Future Princess', element: 'Light', class: 'Tanker'},
    {name: 'Dark Magician Beth', element: 'Dark', class: 'Warrior'},
    {name: 'Nine-Tailed-Fox Garam', element: 'Water', class: 'Ranged Dealer'},
    {name: 'Rue the Weredeer', element: 'Earth', class: 'Ranged Dealer'},
    {name: 'Miya the Exorcist', element: 'Fire', class: 'Support'}
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // delete heroes that don't have an owner to prevent duplicated seed information
        // make sure we only delete heroes without an owner/user
        Hero.deleteMany({ owner: null })
            .then(deletedHeroes => {
                console.log('deletedHeroes', deletedHeroes)
                // create new heroes using startHeroes
                Hero.create(startHeroes)
                    .then(newHeroes => {
                        console.log('the new heroes', newHeroes)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })

    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })