const Login_with_google_controller = async(req, res, next) => {
    try {

        return res.json({
            success: true,
            message: ""
        })
    } catch (error) {
        next(error)
    }
}
module.exports = Login_with_google_controller