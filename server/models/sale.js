import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const saleSchema = Schema({
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: false },
    clientName: { type: String, required: true },
    net: { type: String, required: true },
    received: { type: String, required: true },
    top: { type: String, required: true },
    staff: { type: String, required: true },
    uid: { type: String },
}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
saleSchema.pre('save', async function (next) {
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

const saleModel = model('Sale', saleSchema)
export default saleModel