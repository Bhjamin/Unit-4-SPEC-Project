// importing the dotenv file and using the config method on it
require('dotenv').config()

const jwt = require('jsonwebtoken')

// destructuring the secrect variable from our .env import
const {SECRET} = process.env


module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            // If the headerToken doesnt have a value then the response will send a 401 status
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        // Creating the token variable but not assigning it a value yet
        let token


        try {
            token = jwt.verify(headerToken, SECRET)
            // Trying to assign the token variable a value
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            // If token never gets a value then it fails to authenticate the user
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}