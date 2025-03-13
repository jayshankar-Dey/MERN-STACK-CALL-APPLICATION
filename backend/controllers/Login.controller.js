const Users = require('../model/User.model')
const Email_send = require('../package/email.send')
const generateOtp = require('../package/otp.generator')
const otp_email_template = require('../template/otp_email_template')


///
const Login_controller = async(req, res, next) => {
    try {
        const { email } = req.body
        const name = email.split('@')[0]

        if (!name) return res.json({ success: false, message: "please enter valide email" })

        const otp = Number(generateOtp())

        await Email_send(email, 'Verify your email', 'your one time password', otp_email_template.replace("[name]", name).replace("[otp]", otp))

        const find = await Users.findOne({ email })

        if (find) {
            find.is_Varify = false
            find.otp = otp
            await find.save()

            return res.json({
                success: true,
                name
            })
        } else {
            await Users.create({ email, name, otp })
            return res.json({
                success: true,
                name
            })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = Login_controller