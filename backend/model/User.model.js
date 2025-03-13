const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    otp: {
        type: Number,
        trim: true
    },
    is_Varify: {
        type: Boolean,
        default: false
    },
    isin_call: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users