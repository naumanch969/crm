import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const refundSchema = Schema({
    branch: { type: String, required: false, default: '' },
    amount: { type: String, required: true },
    clientName: { type: String, required: true },
    CNIC: { type: String, required: false, default: '' },
    phone: { type: String, required: true },
    reason: { type: String, required: true },
    notificationId: { type: Schema.Types.ObjectId, ref: 'Notification', required: true },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },  // for refund
    status: { type: String, default: 'underProcess', enum: ['accepted', 'rejected', 'underProcess'] },  // for refund
    uid: { type: String }
}, { timestamps: true })

// Before saving a new document, generate a unique readable identifier
refundSchema.pre('save', async function (next) {
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

const refundModel = model('Refund', refundSchema)
export default refundModel