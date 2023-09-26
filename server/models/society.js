import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const societySchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
    images: { type: [String], default: [] },
    projects: { type: [Schema.Types.ObjectId], ref: 'Project', default: [] },
    isArchived: { type: Boolean, default: false },
    uid: { type: String },
}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
societySchema.pre('save', async function (next) {
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

const societyModel = model('Society', societySchema)
export default societyModel