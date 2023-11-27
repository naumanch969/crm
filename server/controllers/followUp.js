import mongoose from 'mongoose'
import FollowUp from '../models/followUp.js'
import { createError } from '../utils/error.js'

export const getFollowUp = async (req, res, next) => {
    try {

        const { followUpId } = req.params
        const findedFollowUp = await FollowUp.findById(followUpId).populate({
            path: 'leadId',
            populate: {
                path: 'client'
            }
        })
        if (!findedFollowUp) return next(createError(400, 'FollowUp not exist'))

        res.status(200).json({ result: findedFollowUp, message: 'followUp created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getFollowUps = async (req, res, next) => {
    try {
        const { leadId } = req.params
        const findedFollowUp = await FollowUp.find({ leadId }).populate({
            path: 'leadId',
            populate: {
                path: 'client'
            }
        })

        res.status(200).json({ result: findedFollowUp, message: 'followUp created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const getEmployeeFollowUps = async (req, res, next) => {
    try {
        const { leadId } = req.params;

        // Find all follow-ups related to the given leadId
        const allFollowUps = await FollowUp.find({ leadId }).populate('leadId');

        const employeeFollowUps = allFollowUps.filter((followUp) => followUp.leadId?.allocatedTo?.findIndex(allocatedTo => allocatedTo.toString() == req.user._id.toString()) != -1)

        res.status(200).json({ result: employeeFollowUps, message: 'FollowUps retrieved successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};






export const getEmployeeFollowUpsStats = async (req, res, next) => {
    try {
        // const response = await FollowUp.aggregate([
        //     {
        //         $sort: { createdAt: 1 },
        //     },
        //     {
        //         $group: {
        //             _id: {
        //                 $dateToString: { format: '%Y-%m-%d', date: '$followUpDate' },
        //             },
        //             followUps: { $push: '$$ROOT' },
        //         },
        //     },
        //     {
        //         $project: {
        //             _id: 0,
        //             date: '$_id',
        //             followUps: 1,
        //         },
        //     },
        //     {
        //         $unwind: '$followUps'
        //     },
        //     {
        //         $lookup: {
        //             from: 'leads',
        //             localField: 'followUps.leadId',
        //             foreignField: '_id',
        //             as: 'followUps.lead'
        //         }
        //     },
        //     {
        //         $unwind: '$followUps.lead'
        //     },
        //     {
        //         $match: {
        //             'followUps.lead.allocatedTo': req.user._id
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'followUps.lead.client',
        //             foreignField: '_id',
        //             as: 'followUps.lead.client'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'projects',
        //             localField: 'followUps.lead.property',
        //             foreignField: '_id',
        //             as: 'followUps.lead.property',
        //         },
        //     },
        //     {
        //         $group: {
        //             _id: '$date',
        //             followUps: { $push: '$followUps' }
        //         }
        //     },
        // ]);

        const followUps = await FollowUp.find()
            .populate({
                path: 'leadId',
                populate: [
                    { path: 'property' },
                    { path: 'client' },
                    { path: 'allocatedTo' }
                ]
            });

        const filteredFollowUps = followUps
            .filter(followUp => followUp.leadId.allocatedTo.findIndex(user => user._id.toString() == req.user._id.toString()) != -1)
            .reduce((result, followUp) => {
                const followUpDate = new Date(followUp.followUpDate).toLocaleDateString();

                if (!result.find(item => item.date === followUpDate)) {
                    result.push({ date: followUpDate, followUps: [] });
                }

                result.forEach(item => {
                    if (item.date === followUpDate) {
                        item.followUps.push(followUp);
                    }
                });

                return result;
            }, []);

        res.status(200).json({ result: filteredFollowUps, message: 'stats fetched successfully.', success: true });
    } catch (error) {
        next(createError(500, error.message))
    }
};

export const getFollowUpsStats = async (req, res, next) => {
    try {

        const followUps = await FollowUp.find()
            .populate({
                path: 'leadId',
                populate: [
                    { path: 'property' },
                    { path: 'client' },
                    { path: 'allocatedTo' }
                ]
            });

        const reducedFollowUps = followUps.reduce((result, followUp) => {
            const followUpDate = new Date(followUp.followUpDate).toLocaleDateString();

            if (!result.find(item => item.date === followUpDate)) {
                result.push({ date: followUpDate, followUps: [] });
            }

            result.forEach(item => {
                if (item.date === followUpDate) {
                    item.followUps.push(followUp);
                }
            });

            return result;
        }, []);

        res.status(200).json({ result: reducedFollowUps, message: "Stats fetched successfully.", success: true });
    } catch (error) {
        next(createError(500, error.message));
    }
};





export const createFollowUp = async (req, res, next) => {
    try {

        const { status, followUpDate, remarks, } = req.body
        if (!status || !followUpDate || !remarks)
            return next(createError(400, 'Make sure to provide all the fields'))

        const newFollowUp = await FollowUp.create(req.body)
        res.status(200).json({ result: newFollowUp, message: 'followUp created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteFollowUp = async (req, res, next) => {
    try {

        const { followUpId } = req.params
        const findedFollowUp = await FollowUp.findById(followUpId)
        if (!findedFollowUp) return next(createError(400, 'FollowUp not exist'))

        const deletedFollowUp = await FollowUp.findByIdAndDelete(followUpId)
        res.status(200).json({ result: deletedFollowUp, message: 'followUp deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await FollowUp.deleteMany()
        res.status(200).json({ result, message: 'FollowUp collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}