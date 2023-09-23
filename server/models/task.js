import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const taskSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: '', required: false },
    status: { type: String, required: false, default: 'new', enum: ['completed', 'inProgress', 'new', 'overDue'] },
    priority: { type: String, required: false, enum: ['high', 'low', 'moderate'] },
    description: { type: String, required: true },
    isArchived: { type: Boolean, required: false, default: false },
    dueDate: { type: String, required: true },
    uid: { type: String },
}, { timestamps: true })

// Before saving a new document, generate a unique readable identifier
taskSchema.pre('save', async function (next) {
    if (!this.uid) {
        let isUnique = false;
        let generatedIdentifier;

        while (!isUnique) {
            // Generate a unique identifier (you can use a library for this)
            generatedIdentifier = generateUniqueIdentifier();

            // Check if it's unique in the collection
            const existingDocument = await this.constructor.findOne({ uid: generatedIdentifier });

            if (!existingDocument) {
                isUnique = true; // Identifier is unique, exit the loop
            }
        }

        // Assign the generated identifier to the document
        this.uid = generatedIdentifier;
    }
    next();
});

const taskModel = model('Task', taskSchema)
export default taskModel