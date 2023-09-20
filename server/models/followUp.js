import { Schema, model } from 'mongoose'

const followUpSchema = Schema({

    status: { type: String, requried: true },
    followUpDate: { type: String, },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    remarks: { type: String }

}, { timestamps: true })

const followUpModel = model('FollowUp', followUpSchema)
export default followUpModel 