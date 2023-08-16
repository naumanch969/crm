import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, required: false, },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false, },
    role: { type: String, required: true, default: 'client', enum: ['client', 'employee', 'manager', 'super-admin'] },
    officialNumber: { type: Number, required: false, },
    cnic: { type: String, required: false, },
    gender: { type: String, required: false, enum: ['male', 'female'], default: 'male' },
    martialStatus: { type: String, required: false, enum: ['married', 'single'], default: 'single' },
    isActive: { type: Boolean, required: false, default: false },
}, { timestamps: true })

const userModel = model('Employee', userSchema)
export default userModel