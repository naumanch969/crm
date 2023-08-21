import { Schema, model } from 'mongoose'

const voucherSchema = Schema({
    branch: { type: String },
    issuingDate: { type: String },
    dueDate: { type: String },
    customerName: { type: String },
    cnic: { type: Number },
    phone: { type: Number },
    email: { type: String },
    type: { type: String, enum: ['cash', 'cheque', 'credit card', 'online'] },
    total: { type: Number },
    paid: { type: Number },
    remained: { type: Number },
}, { timestamps: true })

const voucherModel = model('Voucher', voucherSchema)
export default voucherModel