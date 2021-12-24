const router = require('express').Router()
const verify = require('../helpers/verify')

router.get('/', verify.user, (req, res) => {
    res.json({
        spaces: {
            id: 'asaosfin203098m0m',
            name: 'your space',
        },
    })
})

module.exports = router
