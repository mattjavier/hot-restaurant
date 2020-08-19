const router = require('express').Router()
const { join } = require('path')

router.get('/tables', (req, res) => {
  res.sendFile(join(__dirname, '../public/tables.html'))
})

router.get('/reserve', (req, res) => {
  res.sendFile(join(__dirname, '../public/reserve.html'))
})

router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router