const express = require('express')
const router = express.Router()
const toyService = require("./toy.service.js")

module.exports = router

router.get('/', (req, res) => {
    const filterBy = JSON.parse(req.query.params)
    
    toyService.query(filterBy)
        .then(toys => {
            res.json(toys)
        })
})

router.get('/:id', (req, res) => {
    const toyId = req.params.id
    toyService.getById(toyId)
        .then(toy => {
            res.json(toy)
        })
})

router.delete('/:id', (req, res) => {
    const toyId = req.params.id
    toyService.remove(toyId)
        .then(() => {
            res.end('Done!')
        })
        .catch(err => {
            res.status(500).send({ msg: 'ERRRORORORO' })
        })
})

router.post('/', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.json(savedToy)
        })
})

router.put('/:id', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.json(savedToy)
        })
})


