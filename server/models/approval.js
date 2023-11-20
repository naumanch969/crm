import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const approvalSchema = Schema({
    title: { type: String, required: false },
    description: { type: String, required: true },
    dueDate: { type: Date, required: false },
    type: { type: String, required: true, enum: ['request', 'voucher', 'receipt', 'refund'] },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: false },  // for refund
    status: { type: String, default: 'underProcess', enum: ['accepted', 'rejected', 'underProcess'] },  // for refund
    data: { type: Object, required: false, default: {} },
    uid: { type: String }
}, { timestamps: true })

// Before saving a new document, generate a unique readable identifier
approvalSchema.pre('save', async function (next) {
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

const approvalModel = model('Approval', approvalSchema)
export default approvalModel