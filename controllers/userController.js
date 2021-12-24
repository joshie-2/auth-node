const User = require('../models/User')
const {
    registrationValidation,
    loginValidation,
} = require('../helpers/validation')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')

//Create & save user
exports.create = async (req, res) => {
    try {
        //Validate form submission data
        const { error, value } = registrationValidation(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        //Check if the email exsists
        const emailExist = await User.findOne({ email: value.email })
        if (emailExist)
            return res.status(400).send({ message: `Email already exists` })

        //Hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(value.password, salt)

        //Create user
        const user = new User({
            name: value.name,
            email: value.email,
            password: hashedPassword,
        })
        //Save user
        const savedUser = await user.save()
        res.status(200).send({ ID: savedUser._id })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error)
    }
}

//login user
exports.findOne = async (req, res) => {
    try {
        //Validate form submission data
        const { error, value } = loginValidation(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        //Check if the user exsists
        const user = await User.findOne({ email: value.email })
        if (!user)
            return res
                .status(400)
                .send({ message: `Email does not exists or password is wrong` })
        //Check user password
        const validPassword = await bcrypt.compare(
            value.password,
            user.password
        )
        if (!validPassword)
            return res
                .status(400)
                .send({ message: `Email does not exsist or password is wrong` })
        //Create and assight a token
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.DEV_JWT_TOKEN_SECRET
        )
        res.header('Authorization', accessToken).send({
            accesstoken: `Bearer ${accessToken}`,
            userId: user._id,
        })

        // res.status(200).send({ id: user._id, message: `Successful login` })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error)
    }
}
