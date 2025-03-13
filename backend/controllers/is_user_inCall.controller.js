const Users = require('../model/User.model')

const is_user_in_call = async(req, res, next) => {
    try {
        const { is_call } = req.body
        const user = await Users.findById(req.user._id)
        user.isin_call = is_call
        await user.save()
        return res.json({
            success: true,
            message: "user get succesfully",
            user
        });
    } catch (error) {
        next(error)
    }
}

module.exports = is_user_in_call