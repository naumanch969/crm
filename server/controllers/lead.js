import Lead from '../models/lead.js'
import Project from '../models/project.js'
import User from '../models/user.js'
import { createError, isValidDate } from '../utils/error.js'
import validator from 'validator'

export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId).populate('property').populate('client').populate('allocatedTo').exec()
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeads = async (req, res, next) => {
    try {

        const findedLeads = await Lead.find().populate('property').populate('client').populate('allocatedTo').exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployeeLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find({ allocatedTo: { $in: req.user?._id }, isArchived: false })
            .populate('property').populate('client').populate('allocatedTo')
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
            case 'property':
                pipeline = [
                    {
                        $group: {
                            _id: '$property',
                            count: { $sum: 1 },
                        },
                    },
                ];
                break;
            default:
                return res.status(400).json({ error: 'Invalid type' });
        }

        const aggregatedResult = await Lead.aggregate(pipeline);
        if (type === 'property') {
            // Fetch all projects
            const allProjects = await Project.find({}, { title: 1, _id: 1 }); // Replace with the actual model and fields

            // Create a map to store counts for each project
            const projectCounts = {};

            // Initialize counts to zero for all projects
            allProjects.forEach((project) => {
                projectCounts[project._id] = 0; // Use project._id as _id
            });

            // Update counts based on the aggregated result
            aggregatedResult.forEach((item) => {
                const projectId = item._id; // Use projectId as _id
                const count = item.count || 0; // Use 0 if count is not present
                projectCounts[projectId] = count;
            });

            // Convert the projectCounts map into an array with _id and name fields
            const updatedResult = Object.entries(projectCounts).map(([projectId, count]) => {
                const project = allProjects.find((p) => p._id.toString() === projectId);
                const name = project ? project.title : ''; // Use project.title as name
                return { _id: projectId, name, count };
            });

            res.status(200).json({ result: updatedResult, message: 'Stats fetched successfully.' });
        } else {
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
        }
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
            {
                $project: {
                    client: { $arrayElemAt: ['$clientData', 0] },
                    city: 1,
                    priority: 1,
                    status: 1,
                    source: 1,
                    description: 1,
                    uid: 1,
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

        query = await query.populate('property').populate('client').populate('allocatedTo').exec();
        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const createOnsiteLead = async (req, res, next) => {
    try {

        let { gender, firstName, lastName, phone, email, cnic, allocatedTo, ...leadData } = req.body

        if (!firstName || !lastName || !gender || !phone || !cnic) return next(createError(400, 'Make sure to provide all the client fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        allocatedTo = allocatedTo ?? mongoose.Types.ObjectId(req.user._id)

        // create new client
        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))
        const newClient = await User.create({ gender, firstName, lastName, phone, email, cnic })

        // create new lead
        const newLead = await Lead.create({ ...leadData, createdBy: req.user._id, allocatedTo, clientId: newClient._id, type: 'onsite' })
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

export const createLead = async (req, res, next) => {
    try {
        const {
            firstName, lastName, username, phone, CNIC, clientCity,
            city, priority, property, status, source, description, count
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !username ||
            !phone ||
            !clientCity ||
            !city ||
            !priority ||
            !property ||
            !status ||
            !source ||
            !description
        ) {
            return next(createError(401, 'Make sure to provide all the fields.'));
        }

        const findedClient = await User.findOne({ username });
        if (Boolean(findedClient)) {
            return next(createError(400, 'Username is already exist'));
        }

        // Create the client (user) once
        const client = await User.create({
            firstName,
            lastName,
            username,
            phone,
            CNIC,
            city: clientCity,
            project: property
        });

        // Create the lead(s) based on the counts value or once if counts is undefined
        const leadsToCreate = Number(count) || 1;
        const createdLeads = [];

        for (let i = 0; i < leadsToCreate; i++) {
            const newLead = await Lead.create({
                client: client._id,
                city,
                priority,
                property,
                status,
                source,
                description,
                allocatedTo: [req.user?._id]
            });

            // Query to populate the fields
            const populatedLead = await Lead.findById(newLead._id)
                .populate('allocatedTo')
                .populate('client')
                .populate('property')
                .exec();

            createdLeads.push(populatedLead);
        }

        res.status(200).json({
            result: createdLeads,
            message: `Lead(s) created successfully (${createdLeads.length} lead(s) created)`,
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
            city, priority, property, status, source, description
        } = req.body

        const findedLead = await Lead.findById(leadId)

        const updatedUser = await User.findByIdAndUpdate(findedLead.client, { firstName, lastName, username, phone, CNIC, city: clientCity, project: property })
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { city, priority, property, status, source, description, ...req.body }, { new: true }).populate('property').populate('client').populate('allocatedTo').exec()

        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const shiftLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { shiftTo } = req.body; // lead data

        // // Use $pull to remove 'from' from allocatedTo array
        // await Lead.findByIdAndUpdate(
        //     leadId,
        //     { $pull: { allocatedTo: req.user._id } },
        //     { new: true }
        // );

        // // Use $push to add 'to' to allocatedTo array
        // const updatedLead = await Lead.findByIdAndUpdate(
        //     leadId,
        //     { $push: { allocatedTo: shiftTo } },
        //     { new: true }
        // ).populate('property').populate('client').populate('allocatedTo').exec();

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $set: { allocatedTo: [shiftTo] } },
            { new: true }
        ).populate('property').populate('client').populate('allocatedTo').exec();

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
        ).populate('property').populate('client').populate('allocatedTo').exec();

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