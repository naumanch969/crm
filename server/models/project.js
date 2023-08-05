import { Schema, model } from 'mongoose'

const projectSchema = Schema({
    city: { type: String, required: true },
    project: { type: String, required: true },
    block: { type: String, required: true },
    propertyType: { type: String, required: true },
    homeType: { type: String, required: true },         // define enum
    minBudget: { type: Number, required: true, min: 0 },
    maxBudget: { type: Number, required: true, min: 0 },
    minAreaUnit: { type: String, required: true },      // define enum
    minArea: { type: Number, required: true, min: 0 },
    maxAreaUnit: { type: String, required: true },
    maxArea: { type: Number, required: true, min: 0 },
    leadPriority: { type: String, required: true },     // define enum
    clientType: { type: String, required: true },       // define enum
    allocatedTo: { type: String, required: true },
    beds: { type: String, required: true },
    supplier: { type: String, required: true },         // make type to be ObjectId of User
}, { timestamps: true })

const projectModel = model('Project', projectSchema)
export default projectModel