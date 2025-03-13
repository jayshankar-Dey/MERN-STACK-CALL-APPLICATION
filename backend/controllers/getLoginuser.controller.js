const Users = require('../model/User.model')

const get_Login_user = async(req, res, next) => {
    try {
        const { id } = req.params
        const user = id ? await Users.findById(id) : req.user
        return res.json({
            success: true,
            message: "user get succesfully",
            user
        });
    } catch (error) {
        next(error)
    }
}

module.exports = get_Login_user