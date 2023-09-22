import { Schema, model } from 'mongoose'

const userSchema = Schema({
    password: { type: String, required: false, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    CNIC: { type: String, required: false },
    email: { type: String, required: false },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    role: { type: String, required: true, default: 'client', enum: ['client', 'employee', 'manager', 'super_admin'] },
    // below fields are not related to client (rather to employee,manager)
    officialNumber: { type: Number, required: false, default: '' },
    gender: { type: String, required: false, enum: ['male', 'female'], default: 'male' },
    martialStatus: { type: String, required: false, enum: ['married', 'single'], default: 'single' },
    isActive: { type: Boolean, required: false, default: false },
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel