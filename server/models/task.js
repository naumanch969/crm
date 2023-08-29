import { Schema, model } from 'mongoose'

const taskSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: '', required: false },
    status: { type: String, required: false, default: 'new', enum: ['completed', 'inProgress', 'new', 'overDue'] },
    priority: { type: String, required: false, enum: ['high', 'low', 'moderate'] },
    description: { type: String, required: true },
    isArchived: { type: Boolean, required: false, default: false },
    dueDate: { type: String, required: true },
}, { timestamps: true })

const taskModel = model('Task', taskSchema)
export default taskModel