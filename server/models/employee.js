import { Schema, model } from 'mongoose'
import { generateUniqueIdentifier } from '../utils/utils.js'

const employeeSchema = Schema({
    username: { type: String, required: false, },
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    phone: { type: String, required: true, unique: true },
    employee: { type: String, required: false, unique: true},
    password: { type: String, required: false, },
    role: { type: String, required: true, default: 'client', enum: ['client', 'employee', 'manager', 'super_admin'] },
    uid: { type: String },
}, { timestamps: true })


// Before saving a new document, generate a unique readable identifier
employeeSchema.pre('save', async function (next) {
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


const userModel = model('Employee', employeeSchema)
export default userModel