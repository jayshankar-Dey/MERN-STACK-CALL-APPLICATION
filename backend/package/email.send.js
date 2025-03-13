const nodemailer = require('nodemailer')

const Email_send = async(to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    try {
        const send = {
            from: `"Call App" <${process.env.EMAIL}>`,
            to,
            subject,
            text,
            html
        }
        const info = await transporter.sendMail(send)
        if (info.messageId) {
            return info.messageId
        } else {
            return null
        }
    } catch (error) {
        console.log(`
                error in email send $ { error }
                `.bgRed)
    }
}

module.exports = Email_send