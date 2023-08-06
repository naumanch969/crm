import { Schema, model } from 'mongoose'

const leadSchema = Schema({

    gender: { type: String, requried: true },
    name: { type: String, requried: true },
    primaryPhone: { type: Number, requried: true },
    secondaryPhone: { type: Number, requried: true },
    location: { type: String, requried: true },
    email: { type: String, requried: true },
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

    type: { type: String, required: false, default: 'onsite', enum: ['onsite', 'online'] },
    projectId: { type: String, required: false }            // todo: replace with ObjectId

}, { timestamps: true })

const leadModel = model('Lead', leadSchema)
export default leadModel