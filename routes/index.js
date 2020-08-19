const router = require('express').Router()

router.use('/api', require('./tableRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router