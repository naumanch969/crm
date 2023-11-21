import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const userSchema = Schema({
    password: { type: String, required: false, },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: false },
    CNIC: { type: String, required: false },
    email: { type: String, required: false, default: '' },
    role: { type: String, required: true, default: 'client', enum: ['client', 'employee', 'manager', 'super_admin'] },
    uid: { type: String },
}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
userSchema.pre('save', async function (next) {
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

const userModel = model('User', userSchema)
export default userModel