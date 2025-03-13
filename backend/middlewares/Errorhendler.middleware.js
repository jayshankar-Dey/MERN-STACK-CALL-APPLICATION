const Error_hendler = (error, req, res, next) => {

    const message = error.message || "somthing wait wrong"
    const status = error.status || 500

    return res.status(status).json({
        success: false,
        message
    });
}

module.exports = Error_hendler