const Users = require('../model/User.model')

const get_login_users = async(req, res, next) => {
    try {
        const { search } = req.body;
        const query = search ? { name: { $regex: search, $options: "i" }, _id: { $ne: req.user._id } } : { _id: { $ne: req.user._id } }

        const users = await Users.find(query)

        return res.json({
            success: true,
            message: "users get succesfully",
            users
        })
    } catch (error) {
        next(error)
    }
}
module.exports = get_login_users