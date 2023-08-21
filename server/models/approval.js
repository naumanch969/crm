import { Schema, model } from 'mongoose'

const approvalSchema = Schema({
    title: { type: String, required: false },
    description: { type: String, required: true },
    dueDate: { type: Date, required: false },
    type: { type: String, required: true, enum: ['request', 'voucher', 'receipt', 'refund'] },
    data: { type: Object, required: false, default: {} }
}, { timestamps: true })

const approvalModel = model('Approval', approvalSchema)
export default approvalModel