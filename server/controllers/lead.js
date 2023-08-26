import Lead from '../models/lead.js'
import User from '../models/user.js'
import { createError } from '../utils/error.js'
import validator from 'validator'

export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId).populate('clientId').populate('allocatedTo').exec()
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeads = async (req, res, next) => {
    try {
        const { new: new_query, type } = req.query;

        let query = {};
        if (new_query) {
            query = type ? { type, isArchived: false } : { isArchived: false };
        } else {
            query = type ? { type, isArchived: false } : { isArchived: false };
        }

        const findedLeads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('clientId')
            .populate('allocatedTo')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployeeLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find({ allocatedTo: req.user?._id, isArchived: false })
            .populate('clientId')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
}


export const getArchivedLeads = async (req, res, next) => {
    try {

        const findedLeads = await Lead.find({ isArchived: true }).populate('clientId').exec()
        res.status(200).json({ result: findedLeads, message: 'Archived leads fetched successfully', success: true })

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

        const statusEnum = ['successful', 'unsuccessful', 'underProcess', 'declined', 'remaining'];
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

        let { gender, firstName, lastName, phone, email, cnic, allocatedTo, ...leadData } = req.body

        if (!firstName || !lastName || !gender || !email || !phone || !cnic) return next(createError(400, 'Make sure to provide all the client fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        allocatedTo = allocatedTo ?? mongoose.Types.ObjectId(req.user._id)

        // create new client
        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))
        const newClient = await User.create({ gender, firstName, lastName, phone, email, cnic })

        // create new lead
        const newLead = await Lead.create({ ...leadData, allocatedTo, clientId: newClient._id, type: 'onsite' })
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createOnlineLead = async (req, res, next) => {
    try {

        let { projectId, ...clientData } = req.body

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
        let { _id: inputLeadId, allocatedTo, ...leadData } = req.body    // lead data
        let { gender, firstName, lastName, phone, email, cnic, } = req.body // client data

        // checking if lead exist
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        // for online lead, (clientId is populated version (actually it is client object) )
        if (leadData?.clientId) {
            await User.findByIdAndUpdate(leadData.clientId._id, { gender, firstName, lastName, phone, email, cnic }, { new: true })
        }

        allocatedTo = allocatedTo ?? req.user._id

        // create new lead
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { $set: { ...leadData, allocatedTo } }, { new: true }).populate('clientId').populate('allocatedTo').exec()
        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const archiveLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const result = await Lead.findByIdAndUpdate(leadId, { $set: { isArchived: true } }, { new: true })
        res.status(200).json({ result, message: 'lead deleted successfully', success: true })

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