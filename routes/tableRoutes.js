const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')

// GET all table reservations
router.get('/tables', (req, res) => {
  fs.readFile(join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST new table reservation
router.post('/tables', (req, res) => {
  fs.readFile(join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let tables = JSON.parse(data)
    let table = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      id: req.body.id,
      reservationList: req.body.reservationList
    }

    tables.push(table)
    fs.writeFile(join(__dirname, '../db/db.json'), JSON.stringify(tables), err => {
      if (err) { console.log(err) }
      res.json(table)
    })
  })
})

// PUT update to table with id
router.put('/tables/:id', (req, res) => {
  fs.readFile(join(__dirname, '../db/db.json'), 'utf8', (err ,data) => {
    if (err) { console.log(err) }
    let tables = JSON.parse(data)

    tables.forEach(table => {
      if (table.id === req.params.id) {
        table.reservationList = req.params.reservationList
      }
    })

    fs.writeFile(join(__dirname, '../db/db.json'), JSON.stringify(tables), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

// DELETE a table reservation with id
router.delete('/tables/:id', (req, res) => {
  fs.readFile(join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let tables = JSON.parse(data)


  })
})