import { Schema, model } from 'mongoose'

const societySchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', 'nonActive'] },
    images: { type: [String], default: [] },
    projects: { type: [Schema.Types.ObjectId], ref: 'Project', default: [] },
    isArchived: { type: Boolean, default: false }
}, { timestamps: true })

const societyModel = model('Society', societySchema)
export default societyModel