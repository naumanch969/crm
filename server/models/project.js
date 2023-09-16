import { Schema, model } from 'mongoose'

const projectSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', 'nonActive'] },
    society: { type: Schema.Types.ObjectId, ref: 'Society', required: true },
    inventories: { type: [Schema.Types.ObjectId], ref: 'Inventory', default: [] },
    isArchived: { type:Boolean,default:false },
}, { timestamps: true })

const projectModel = model('Project', projectSchema)
export default projectModel