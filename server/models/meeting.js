import { Schema, model } from 'mongoose'

const meetingSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    from: { type: String, required: true },
    to: { type: String, required: true },
    dueDate: { type: String, required: true }
}, { timestamps: true })

const meetingModel = model('meeting', meetingSchema)
export default meetingModel