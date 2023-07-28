import { Schema, model } from 'mongoose'

const taskSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: '', required: false },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
}, { timestamps: true })

const taskModel = model('Task', taskSchema)
export default taskModel