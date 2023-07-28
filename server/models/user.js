import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 3, },
    role: { type: String, required: true, default: 'user', enum: ['user', 'employee', 'manager', 'super-admin'] },
    // below fields are not related to client (rather to employee,manager)
    officialNumber: { type: Number, required: false, },
    cnic: { type: String, required: false, },
    gender: { type: String, required: false, enum: ['male', 'female'], default: 'male' },
    martialStatus: { type: String, required: false, enum: ['married', 'single'], default: 'single' },
    isActive: { type: Boolean, required: false, default: false },
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel