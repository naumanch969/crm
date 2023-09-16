import { Schema, model } from 'mongoose'

const inventorySchema = Schema({
    sellerName: { type: String, required: true },
    sellerPhone: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    sellerCompamyName: { type: String, required: true },
    sellerCity: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    propertyStreetNumber: { type: String, required: true },
    propertyNumber: { type: Number, required: true },       // Plot/Shop/Appartment Number
    price: { type: String, required: true },
    remarks: { type: String, required: true },
    status: { type: String, default: 'unsold', enum: ['sold', 'unsold', 'underProcess'] },
    isArchived: { type: Boolean, default: false },
}, { timestamps: true })

const inventoryModel = model('Inventory', inventorySchema)
export default inventoryModel