import { Schema, model } from 'mongoose'

const leadSchema = Schema({



}, { timestamps: true })

const leadModel = model('Lead', leadSchema)
export default leadModel