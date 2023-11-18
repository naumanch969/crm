import { Schema, model } from 'mongoose'

const deductionSchema = Schema({

    lateArrivals: {
        type: Number,
        required: true
    },
    halfDays: {
        type: Number,
        required: true
    },
    dayOffs: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const deductionModel = model('deduction', deductionSchema)

export default deductionModel