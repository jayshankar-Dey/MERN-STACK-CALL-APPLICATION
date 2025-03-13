const Users = require("../model/User.model")
const jwt = require('jsonwebtoken')

const OTP_controller = async(req, res, next) => {
    try {
        const { otp, email } = req.body

        const exiest = await Users.findOne({ email })
        if (exiest) {
            if (Number(otp) == Number(exiest.otp)) {
                const secret = process.env.JWT_SECRET
                exiest.is_Varify = true
                await exiest.save()

                const token = jwt.sign({ id: exiest._id }, secret)

                return res.json({
                    success: true,
                    message: `dear ${exiest.name} your email is verify succesfully`,
                    token
                })
            } else {
                return res.json({
                    success: false,
                    message: `dear ${exiest.name} please enter valide otp`
                })
            }
        } else {
            return res.json({
                success: false,
                message: "Please enter valide data"
            })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = OTP_controller