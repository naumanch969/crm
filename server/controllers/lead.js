import Lead from '../models/lead.js'
import User from '../models/user.js'
import { createError, isValidDate } from '../utils/error.js'
import validator from 'validator'

export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId).populate('client').populate('allocatedTo').exec()
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeadByPhone = async (req, res, next) => {
    try {

        const { phone } = req.params

        const findedUser = await User.findOne({ phone })

        const findedLead = await Lead.find({ client: findedUser._id }).populate('client').populate('allocatedTo').exec()

        res.status(200).json({ result: findedLead, message: 'lead fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find().populate('client').populate('allocatedTo').exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployeeLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find({ allocatedTo: { $in: req.user?._id }, isArchived: false })
            .populate('client').populate('allocatedTo')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
}


const priorities = [
    { name: "Very Hot", value: 'veryHot' },
    { name: "Hot", value: 'hot' },
    { name: "Moderate", value: 'moderate' },
    { name: "Cold", value: 'cold' },
    { name: "Very Cold", value: 'veryCold' },
];

const sources = [
    { name: "Instagram", value: 'instagram' },
    { name: "Facebook", value: 'facebook' },
    { name: "Facebook Comment", value: 'facebookComment' },
    { name: "Friend and Family", value: 'friendAndFamily' },
    { name: "Direct Call", value: 'directCall' },
    { name: "Google", value: 'google' },
    { name: "Referral", value: 'referral' },
];

const statuses = [
    { name: "New", value: 'new' },
    { name: "Closed (Lost)", value: 'closedLost' },
    { name: "Closed (Won)", value: 'closedWon' },
    { name: "Meeting (Done)", value: 'meetingDone' },
    { name: "Meeting (Attempt)", value: 'meetingAttempt' },
    { name: "Followed Up (Call)", value: 'followedUpCall' },
    { name: "Followed Up (Email)", value: 'followedUpEmail' },
    { name: "Contacted Client (Call)", value: 'contactedClientCall' },
    { name: "Contacted Client (Call Attempt)", value: 'contactedClientCallAttempt' },
    { name: "Contacted Client (Email)", value: 'contactedClientEmail' },
];
export const getLeadsStat = async (req, res, next) => {
    const { type } = req.query;

    try {
        let pipeline = [];

        switch (type) {
            case 'status':
                pipeline = [
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 },
                        },
                    },
                ];
                break;
            case 'priority':
                pipeline = [
                    {
                        $group: {
                            _id: '$priority',
                            count: { $sum: 1 },
                        },
                    },
                ];
                break;
            case 'source':
                pipeline = [
                    {
                        $group: {
                            _id: `$source`,
                            count: { $sum: 1 },
                        },
                    },
                ];
                break;
            default:
                return res.status(400).json({ error: 'Invalid type' });
        }

        const aggregatedResult = await Lead.aggregate(pipeline);

        // For priorities, sources, and statuses, create a map to store counts
        const itemCounts = {};

        // Initialize counts to zero for all items
        const allItems = type == 'priority' ? priorities : type == 'source' ? sources : statuses; // Change to sources, statuses, etc. as needed
        allItems.forEach((item) => {
            itemCounts[item.value] = 0;
        });

        // Update counts based on the aggregated result
        aggregatedResult.forEach((item) => {
            const itemName = item._id;
            const count = item.count || 0; // Use 0 if count is not present
            itemCounts[itemName] = count;
        });

        // Convert the itemCounts map into an array with all three fields
        const updatedResult = Object.keys(itemCounts).map((itemValue) => {
            const itemName = allItems.find((item) => item.value === itemValue)?.name || itemValue;
            return { _id: itemValue, name: itemName, count: itemCounts[itemValue] };
        });

        res.status(200).json({ result: updatedResult, message: 'Stats fetched successfully.' });

    } catch (error) {
        next(createError(500, error));
    }
};


export const searchLead = async (req, res, next) => {
    try {
        const { query } = req.query;

        const foundLeads = await Lead.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'client',
                    foreignField: '_id',
                    as: 'clientData',
                },
            },
            {
                $match: {
                    $or: [
                        { 'clientData.firstName': { $regex: new RegExp(query, 'i') } },
                        { 'clientData.lastName': { $regex: new RegExp(query, 'i') } },
                        { 'clientData.username': { $regex: new RegExp(query, 'i') } },
                        { 'clientData.phone': { $regex: new RegExp(query, 'i') } },
                        { 'status': { $regex: new RegExp(query, 'i') } },
                        { 'priority': { $regex: new RegExp(query, 'i') } },
                        { 'city': { $regex: new RegExp(query, 'i') } },
                    ],
                },
            },
        ]);

        res.status(200).json({
            result: foundLeads,
            message: 'Leads searched successfully',
            success: true,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const filterLead = async (req, res, next) => {
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = Lead.find(filters);

        // Check if startingDate is provided and valid
        if (startingDate && isValidDate(startingDate)) {
            const startDate = new Date(startingDate);
            startDate.setHours(0, 0, 0, 0);

            // Add createdAt filtering for startingDate
            query = query.where('createdAt').gte(startDate);
        }

        // Check if endingDate is provided and valid
        if (endingDate && isValidDate(endingDate)) {
            const endDate = new Date(endingDate);
            endDate.setHours(23, 59, 59, 999);

            // Add createdAt filtering for endingDate
            if (query.model.modelName === 'Lead') { // Check if the query has not been executed yet
                query = query.where('createdAt').lte(endDate);
            }
        }

        query = await query.populate('client').populate('allocatedTo').exec();
        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};




export const createLead = async (req, res, next) => {
    try {
        const { clientName, clientPhone, priority, country, visa, degree, degreeName, status, source, description, count, major } = req.body;

        const findedLead = await User.findOne({ phone: clientPhone })
        
        // Create the lead(s) based on the counts value or once if counts is undefined
        const leadsToCreate = Number(count) || 1;
        const createdLeads = [];

        for (let i = 0; i < leadsToCreate; i++) {
            const newLead = await Lead.create({
                clientName,
                client: findedLead ? findedLead._id : null,
                clientPhone,
                priority,
                country,
                visa,
                degree,
                degreeName,
                status,
                source,
                major,
                description,
                allocatedTo: [req.user?._id]
            });
            // Query to populate the fields
            const populatedLead = await Lead.findById(newLead._id)
                .populate('allocatedTo')
                .exec();

            createdLeads.push(populatedLead);
        }

        res.status(200).json({
            result: createdLeads,
            message: `Lead(s) created successfully. (${createdLeads.length} lead(s) created)`,
            success: true
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};


export const updateLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const {
            firstName, lastName, username, phone, CNIC, clientCity,
            priority, country, degree, degreeName, visa, status, source, description
        } = req.body

        const findedLead = await Lead.findById(leadId)

        const updatedUser = await User.findByIdAndUpdate(findedLead.client, { firstName, lastName, username, phone, CNIC, city: clientCity })
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { priority, country, visa, degree, degreeName, status, source, description, ...req.body }, { new: true }).populate('client').populate('allocatedTo').exec()

        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const shiftLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { shiftTo } = req.body; // lead data

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $set: { allocatedTo: [shiftTo] } },
            { new: true }
        ).populate('client').populate('allocatedTo').exec();

        res.status(200).json({
            result: updatedLead,
            message: 'Lead shifted successfully',
            success: true,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};


export const shareLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { shareWith } = req.body; // The userId to be added

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $push: { allocatedTo: shareWith } }, // Use $push to add userId to allocatedTo array
            { new: true }
        ).populate('client').populate('allocatedTo').exec();

        res.status(200).json({
            result: updatedLead,
            message: 'Lead shared successfully',
            success: true,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

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