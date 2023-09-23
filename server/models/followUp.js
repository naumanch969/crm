import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const followUpSchema = Schema({

    status: { type: String, requried: true },
    followUpDate: { type: String, },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    remarks: { type: String },
    uid: { type: String }

}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
followUpSchema.pre('save', async function (next) {
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


const followUpModel = model('FollowUp', followUpSchema)
export default followUpModel 