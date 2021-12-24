const jwt = require('jsonwebtoken')

exports.user = (req, res, next) => {
    const accessToken = req.header('Authorization')
    if (!accessToken) return res.status(401).send({ message: `Access denied` })
    try {
        const verified = jwt.verify(
            accessToken,
            process.env.DEV_JWT_TOKEN_SECRET
        )
        req.user = verified
        next()
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error)
    }
}
