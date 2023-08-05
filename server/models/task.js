import { Schema, model } from 'mongoose'

const taskSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: '', required: false },
    status: { type: String, required: false, default: 'to do' },
    priority: { type: String, required: false, enum: ['high', 'low', 'moderate'] },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
}, { timestamps: true })

const taskModel = model('Task', taskSchema)
export default taskModel