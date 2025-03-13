const jwt = require('jsonwebtoken')
const Users = require('../model/User.model')

const is_Auth = async(req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const { id } = await jwt.verify(token, process.env.JWT_SECRET)
        if (id) {
            const data = await Users.findById(id)
            req.user = data
        }
        next()
    } catch (error) {
        return res.json({
            success: false,
            message: "un_authorise user"
        })
    }
}

module.exports = is_Auth