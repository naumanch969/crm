import Lead from '../models/lead.js';
import User from '../models/user.js';
import FollowUp from '../models/followUp.js';
import Project from '../models/project.js';
import { createError, isValidDate } from '../utils/error.js';
import projectModel from '../models/project.js';
import userModel from '../models/user.js';

export const getLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const findedLead = await Lead.findById(leadId)
            .populate('client')
            .populate('allocatedTo')
            .populate('property')
            .exec();

        if (!findedLead) return next(createError(400, 'Lead not exist'));

        res.status(200).json({ result: findedLead, message: 'Lead fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find().populate('client').populate('allocatedTo').populate('property').exec();
        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getLeadByPhone = async (req, res, next) => {
    try {
        const { phone } = req.params;
        const findedUser = await User.findOne({ phone });
        const findedLead = await Lead.find({ client: findedUser?._id })
            .populate('client')
            .populate('allocatedTo')
            .populate('property')
            .exec();

        res.status(200).json({ result: findedLead, message: 'Lead fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployeeLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find({ allocatedTo: req.user?._id, isArchived: false })
            .populate('property')
            .populate('client')
            .populate('allocatedTo')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};



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
                            _id: '$source',
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
            const allProjects = await Project.find({}, { title: 1, _id: 1 });
            const projectCounts = {};

            allProjects.forEach((project) => {
                projectCounts[project._id] = 0;
            });

            aggregatedResult.forEach((item) => {
                const projectId = item._id;
                const count = item.count || 0;
                projectCounts[projectId] = count;
            });

            const updatedResult = Object.entries(projectCounts).map(([projectId, count]) => {
                const project = allProjects.find((p) => p._id.toString() === projectId);
                const name = project ? project.title : '';
                return { _id: projectId, name, count };
            });

            res.status(200).json({ result: updatedResult, message: 'Stats fetched successfully.' });
        } else {
            const itemCounts = {};
            const allItems = type == 'priority' ? priorities : type == 'source' ? sources : statuses;

            allItems.forEach((item) => {
                itemCounts[item.value] = 0;
            });

            aggregatedResult.forEach((item) => {
                const itemName = item._id;
                const count = item.count || 0;
                itemCounts[itemName] = count;
            });

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

        if (startingDate && isValidDate(startingDate)) {
            const startDate = new Date(startingDate);
            startDate.setHours(0, 0, 0, 0);
            query = query.where('createdAt').gte(startDate);
        }

        if (endingDate && isValidDate(endingDate)) {
            const endDate = new Date(endingDate);
            endDate.setHours(23, 59, 59, 999);

            if (query.model.modelName === 'Lead') {
                query = query.where('createdAt').lte(endDate);
            }
        }

        query = await query.populate('property').populate('client').populate('allocatedTo').exec();
        query = await query.populate('client').populate('allocatedTo').exec();

        res.status(200).json({ result: query });
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const createLead = async (req, res, next) => {
    try {
        const {city, priority, property, status, source, description, count, clientName, clientPhone} = req.body;
        const { followUpStatus, followUpDate, remarks } = req.body  // for followup

        const foundLead = await User.findOne({ phone: clientPhone });

        const leadsToCreate = Number(count) || 1;
        const createdLeads = [];

        for (let i = 0; i < leadsToCreate; i++) {
            const newLead = await Lead.create({
                client: foundLead ? foundLead._id : null,
                city,
                clientName,
                clientPhone,
                priority,
                property,
                status,
                source,
                description,
                allocatedTo: [req.user?._id],
            });

            await FollowUp.create({ status: followUpStatus, followUpDate, remarks, leadId: newLead._id })


            const populatedLead = await Lead.findById(newLead._id)
                .populate('client')
                .populate('property')
                .populate('allocatedTo')
                .exec();

            createdLeads.push(populatedLead);
        }

        res.status(200).json({
            result: createdLeads,
            message: `Lead(s) created successfully (${createdLeads.length} lead(s) created)`,
            success: true,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const updateLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const {
            firstName, lastName, username, phone, CNIC, clientCity,
            city, priority, property, status, source, description,
        } = req.body;

        const foundLead = await Lead.findById(leadId);

        const updatedUser = await User.findByIdAndUpdate(
            foundLead.client,
            { firstName, lastName, username, phone, CNIC, city: clientCity, project: property },
        );

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { city, priority, property, status, source, description, ...req.body },
            { new: true },
        )
            .populate('property')
            .populate('client')
            .populate('allocatedTo')
            .exec();

        res.status(200).json({ result: updatedLead, message: 'Lead updated successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const shiftLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { shiftTo } = req.body;

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $set: { allocatedTo: [shiftTo] } },
            { new: true },
        )
            .populate('property')
            .populate('client')
            .populate('allocatedTo')
            .exec();

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
        const { shareWith } = req.body;

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $push: { allocatedTo: shareWith } },
            { new: true },
        )
            .populate('property')
            .populate('client')
            .populate('allocatedTo')
            .exec();

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
        const { leadId } = req.params;
        const result = await Lead.findByIdAndUpdate(leadId, { $set: { isArchived: true } }, { new: true });
        res.status(200).json({ result, message: 'Lead archived successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const deleteLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const foundLead = await Lead.findById(leadId);

        if (!foundLead) return next(createError(400, 'Lead not exist'));

        const deletedLead = await Lead.findByIdAndDelete(leadId);
        res.status(200).json({ result: deletedLead, message: 'Lead deleted successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Lead.deleteMany();
        res.status(200).json({ result, message: 'Lead collection deleted successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};
