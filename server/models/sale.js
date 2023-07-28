import { Schema, model } from 'mongoose'

const saleSchema = Schema({
    // leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    leadId: { type: String, required: true },
    supplierName: { type: String, required: true },
    net: { type: String, required: true },
    received: { type: String, required: true },
    branch: { type: String, required: true },
    psf: { type: String, required: true },
    fop: { type: String, required: true },
    staff: { type: String, required: true },
    invoiseNumber: { type: String, required: true },
}, { timestamps: true })

const saleModel = model('Sale', saleSchema)
export default saleModel