import { Schema, model } from 'mongoose'

const notificationSchema = Schema({
    title: { type: String, required: false },
    type: { type: String, required: true, enum: ['registeration-approval'] },
    description: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    data: { type: Object, required: false }
}, { timestamps: true })

const notificationModel = model('Notification', notificationSchema)
export default notificationModel