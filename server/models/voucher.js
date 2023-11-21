import { generateUniqueIdentifier } from '../utils/utils.js'
import { Schema, model } from 'mongoose'

const voucherSchema = Schema({
    issuingDate: { type: String },
    branch: { type: String },
    allocatedTo: { type: Schema.Types.ObjectId, ref:'User' },
    dueDate: { type: String },
    clientName: { type: String },
    CNIC: { type: Number },
    phone: { type: Number },
    email: { type: String },
    type: { type: String,  },
    propertyType: { type: String },
    area: { type: String },
    project: { type: Schema.Types.ObjectId, ref: 'Project', },
    total: { type: String },
    paid: { type: String },
    remained: { type: String },
    note: { type: String },
    status: { type: String, default: 'underProcess' },   // under process, declined, accepted
    uid: { type: String },
}, { timestamps: true })

// Before saving a new document, generate a unique readable identifier
voucherSchema.pre('save', async function (next) {
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

const voucherModel = model('Voucher', voucherSchema)
export default voucherModel