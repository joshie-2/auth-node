const database = require('mongoose')

const userSchema = new database.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 255,
            min: 6,
        },
        email: {
            type: String,
            required: true,
            max: 255,
            min: 6,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            min: 6,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
)

module.exports = database.model('User', userSchema)