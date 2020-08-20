const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')

// GET all table and waitlist reservations
router.get('/tables', (req, res) => {
  fs.readFile(join(__dirname, '../db/reserve.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

router.get('/waitlist', (req, res) => {
  fs.readFile(join(__dirname, '../db/wait.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST new table reservation
router.post('/tables', (req, res) => {
  fs.readFile(join(__dirname, '../db/reserve.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let tables = JSON.parse(data)

    let table = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      id: req.body.id
    }

    if (tables.length < 5) {
      tables.push(table)

      fs.writeFile(join(__dirname, '../db/reserve.json'), JSON.stringify(tables), err => {
        if (err) { console.log(err) }
    
        res.json(table)
      })
    } else {
      fs.readFile(join(__dirname, '../db/wait.json'), 'utf8', (err, data) => {
        if (err) { console.log(err) }
        waitlist = JSON.parse(data)
         
        waitlist.push(table)  

        fs.writeFile(join(__dirname, '../db/wait.json'), JSON.stringify(waitlist), err => {
          if (err) { console.log(err) }
        
          res.json(table)
        })
      })
    }
  })
})

// DELETE a table reservation with id
router.delete('/clear', (req, res) => {
  let tables = []
  let waitlist = []

  fs.writeFile(join(__dirname, '../db/reserve.json'), JSON.stringify(tables), err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })

  fs.writeFile(join(__dirname, '../db/wait.json'), JSON.stringify(waitlist), err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router