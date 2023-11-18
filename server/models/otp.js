import { Schema, model } from 'mongoose'

const otpSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }

    // After 5 minutes, it will be deleted from database automatically
}, { timestamps: true })

const otpModel = model('OTP', otpSchema)

export default otpModel