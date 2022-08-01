const express = require('express')
const passport = require('passport')

// pull in Mongoose model for heros
const Hero = require('../models/hero')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ROUTES

// POST -> create weapon
// POST /weapons/:heroId
router.post('/weapons/:heroId', removeBlanks, (req, res, next) => {
    const weapon = req.body.weapon
    // get our hero's id from req.params.heroId
    const heroId = req.params.heroId
    // find the hero
    Hero.findById(heroId)
        .then(handle404)
        .then(hero => {
            console.log('this is the hero', hero)
            console.log('this is the weapon', weapon)

            // push into the hero's weapons array
            hero.weapons.push(weapon)

            // save the hero
            return hero.save()
            
        })
        // send the newly updated hero as json
        .then(hero => res.status(201).json({ hero: hero }))
        .catch(next)
})

// UPDATE weapon
// PATCH /weapon/:heroId/:weaponId
router.patch('/weapons/:heroId/:weaponId', requireToken, removeBlanks, (req, res, next) => {

    const heroId = req.params.heroId
    const weaponId = req.params.weaponId

    // find our hero
    Hero.findById(heroId)
        .then(handle404)
        .then(hero => {
            const theWeapon = hero.weapons.id(weaponId)
            // make sure the user sending the request is the owner
            requireOwnership(req, hero)
            theWeapon.set(req.body.weapon)
            // return the saved hero
            return hero.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE weapon
// DELETE /weapons/:heroId/:weaponId
router.delete('/weapons/:heroId/:weaponId', requireToken, (req, res, next) => {

    const heroId = req.params.heroId
    const weaponId = req.params.weaponId

    Hero.findById(heroId)
        // handle 404
        .then(handle404)
        .then(hero => {
            const theWeapon = hero.weapon.id(weaponId)
            // require that the user deleting this weapon is the hero's owner
            requireOwnership(req, hero)
            // call remove on the subdoc
            theWeapon.remove()

            // return the saved hero
            return hero.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

// export the router
module.exports = router