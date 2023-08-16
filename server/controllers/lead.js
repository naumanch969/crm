import Lead from '../models/lead.js'
import User from '../models/user.js'
import { createError } from '../utils/error.js'


export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId).populate('clientId').exec()
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getLeads = async (req, res, next) => {
    try {

        const { new: new_query, type } = req.query

        const findedLeads = new_query
            ?
            type
                ? await Lead.find({ type }).sort({ createdAt: -1 }).limit(10).populate('clientId').exec()
                : await Lead.find().sort({ createdAt: -1 }).limit(10).populate('clientId').exec()
            :
            type
                ? await Lead.find({ type }).populate('clientId').exec()
                : await Lead.find().populate('clientId').exec()

        res.status(200).json({ result: findedLeads, message: 'leads fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeadsStat = async (req, res, next) => {
    try {

        const leadStats = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    value: '$count',
                },
            },
        ]);

        const statusEnum = ['Successful', 'Unsuccessful', 'Under Process', 'Declined', 'Remaining'];
        const leadsStatArray = statusEnum.map(status => {
            const stat = leadStats.find(stat => stat.name === status);
            return {
                name: status,
                value: stat ? stat.value : 0,
            };
        });

        res.status(200).json({ result: leadsStatArray, message: 'Leads stats fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message))
    }
}


export const createOnsiteLead = async (req, res, next) => {
    try {

        const { gender, firstName, lastName, phone, email, cnic, ...leadData } = req.body

        // create new client
        const findedUser = await User.findOne({ email })
        if (findedUser) return next(createError(400, 'Client already exist'))
        const newClient = await User.create({ gender, firstName, lastName, phone, email, cnic })

        // create new lead
        const newLead = await Lead.create({ ...leadData, clientId: newClient._id })
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createOnlineLead = async (req, res, next) => {
    try {

        const { projectId, ...clientData } = req.body

        const emailExist = await User.find({ email: clientData.email })
        if (emailExist) return next(createError(400, 'Email already exist'))
        const usernaeExist = await User.find({ username: clientData.username })
        if (usernaeExist) return next(createError(400, 'Username already exist'))
        const phoneExist = await User.find({ phone: clientData.phone })
        if (phoneExist) return next(createError(400, 'Phone already exist'))

        const newClient = await User.create({ ...clientData })

        const newLead = await Lead.create({ type: 'online', projectId, clientId: newClient._id })
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const { gender, firstName, lastName, phone, email, cnic, _id: inputLeadId, ...leadData } = req.body

        // checking if lead exist
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        // create new client
        if (leadData?.clientId) {
            await User.findByIdAndUpdate(leadData.clientId._id, { gender, firstName, lastName, phone, email, cnic }, { new: true })
        }

        // create new lead
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { $set: leadData }, { new: true }).populate('clientId').exec()
        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        const deletedLead = await Lead.findByIdAndDelete(leadId)
        res.status(200).json({ result: deletedLead, message: 'lead deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Lead.deleteMany()
        res.status(200).json({ result, message: 'Lead collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}