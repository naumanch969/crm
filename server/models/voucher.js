import { Schema, model } from 'mongoose'

const voucherSchema = Schema({
    type: { type: String, required: true, enum: ['in', 'out'] },
    customerName: { type: String, required: true },
    paymentType: { type: String, required: true },
    paymentDetail: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    branchNumber: { type: Number, required: true },
}, { timestamps: true })

const voucherModel = model('Voucher', voucherSchema)
export default voucherModel