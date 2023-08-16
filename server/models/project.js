import { Schema, model } from 'mongoose'

const projectSchema = Schema({
    title: { type: String, required: true },
    city: { type: String, required: true },
    block: { type: String, required: true },
    propertyType: { type: String, required: true },
    homeType: { type: String, required: true },         // define enum
    price: { type: Number, requried: true },
    area: { type: String, requried: true },
    areaUnit: { type: String, required: true },
    priority: { type: String, required: true },     // define enum
    beds: { type: Number, required: false },
    images: { type: Array, required: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'On Hold', enum: ['Not Started', 'Completed', 'In Progress', 'On Hold'] }
}, { timestamps: true })

const projectModel = model('Project', projectSchema)
export default projectModel