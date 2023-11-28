import Cashbook from '../models/cashbook.js'
import Lead from '../models/lead.js'
import { createError } from '../utils/error.js'

export const getCashbooks = async (req, res, next) => {
    try {

        const { type } = req.query

        const findedCashbooks =
            type != 'undefined'
                ? await Cashbook.find({ type })
                : await Cashbook.find()

        res.status(200).json({ result: findedCashbooks, message: 'cashbooks fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getEmployeeCashbooks = async (req, res, next) => {
    try {

        const { type } = req.query

        let allCashbooks =
            type != 'undefined'
                ? await Cashbook.find({ type })
                : await Cashbook.find()

        const employeeLeads = await Lead.find({ allocatedTo: { $in: req.user?._id }, isArchived: false })
            .populate('client').populate('allocatedTo')
            .exec();

        allCashbooks = allCashbooks.filter((cashbook) => {
            return employeeLeads.findIndex(lead => lead?._id?.toString() == cashbook?.leadId?.toString()) != -1
        })

        res.status(200).json({ result: allCashbooks, message: 'cashbooks fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getCashbook = async (req, res, next) => {
    try {

        const { cashbookId } = req.params
        const findedCashbook = await Cashbook.findById(cashbookId)
        if (!findedCashbook) return next(createError(400, 'Cashbook not exist'))

        res.status(200).json({ result: findedCashbook, message: 'cashbook created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const getSpecificDateCashbook = async (req, res, next) => {
    try {
        let startDate, endDate;
        const { date } = req.params; // Date from URL params

        if (date) {
            startDate = new Date(date);
            endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1); // Next day
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to the start of the day
            startDate = today;
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 1); // Next day
        }

        const cashbooks = await Cashbook.find({
            createdAt: { $gte: startDate, $lt: endDate, },
        });

        const cashInCashbooks = cashbooks.filter(cb => cb.type === 'in');

        const cashOutCashbooks = cashbooks.filter(cb => cb.type === 'out');

        res.status(200).json({ result: { cashIn: cashInCashbooks, cashOut: cashOutCashbooks, } });

    } catch (error) {
        next(createError(500, error.message))
    }
};
export const getIncomeAndExpenses = async (req, res, next) => {
    try {
        const currentYear = new Date().getFullYear();
        const requestedYear = req.body.year || currentYear;
        const pipeline = [
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    income: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "in"] },
                                { $toDouble: "$amount" },
                                0,
                            ],
                        },
                    },
                    expense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "out"] },
                                { $toDouble: "$amount" },
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    income: 1,
                    expense: 1,
                },
            },
            {
                $match: {
                    $or: [
                        { year: requestedYear },
                        { year: { $lt: requestedYear } },
                    ],
                },
            },
            {
                $sort: { year: 1, month: 1 },
            },
        ];
        const result = await Cashbook.aggregate(pipeline);
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mergedArray = allMonths.map(month => {
            const entry = result.find(item => item.month === allMonths.indexOf(month) + 1 && item.year === requestedYear);
            return {
                month,
                income: entry ? entry.income : 0,
                expense: entry ? entry.expense : 0,
            };
        });
        res.json({ result: mergedArray, message: 'Income and Expense fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getPaymentsStat = async (req, res, next) => {
    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const thisYearStart = new Date(today.getFullYear(), 0, 1);

        const todayPayments = await Cashbook.aggregate([
            {
                $match: {
                    createdAt: { $gte: today },
                    type: 'in',
                },
            },
            {
                $group: {
                    _id: null,
                    totalReceived: { $sum: { $toDouble: "$amount" } },
                },
            },
        ]);

        const thisMonthPayments = await Cashbook.aggregate([
            {
                $match: {
                    createdAt: { $gte: thisMonthStart },
                    type: 'in',
                },
            },
            {
                $group: {
                    _id: null,
                    totalReceived: { $sum: { $toDouble: "$amount" } },
                },
            },
        ]);

        const thisYearPayments = await Cashbook.aggregate([
            {
                $match: {
                    createdAt: { $gte: thisYearStart },
                    type: 'in',
                },
            },
            {
                $group: {
                    _id: null,
                    totalReceived: { $sum: { $toDouble: "$amount" } },
                },
            },
        ]);

        const paymentsData = {
            todayReceived: todayPayments.length > 0 ? todayPayments[0].totalReceived : 0,
            thisMonthReceived: thisMonthPayments.length > 0 ? thisMonthPayments[0].totalReceived : 0,
            thisYearReceived: thisYearPayments.length > 0 ? thisYearPayments[0].totalReceived : 0,
        };

        res.status(200).json({ result: paymentsData, message: 'payments stats fetched successfully', success: true });

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getLeadCashbooks = async (req, res, next) => {
    try {

        const { leadId } = req.query

        const findedCashbooks = await Cashbook.find({ leadId })

        res.status(200).json({ result: findedCashbooks, message: 'lead cashbooks fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}


export const createCashbook = async (req, res, next) => {
    try {

        const { clientName, top, remarks, amount, type, staff, leadId } = req.body
        if (!clientName || !top || !remarks || !amount || !type || !staff)
            return next(createError(400, 'Make sure to provide all the fields'))

        let newCashbook;
        if (leadId) {
            newCashbook = await Cashbook.create({ clientName, top, remarks, amount, type, staff, leadId })
        }
        else {
            newCashbook = await Cashbook.create({ clientName, top, remarks, amount, type, staff })
        }

        res.status(200).json({ result: newCashbook, message: 'cashbook created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteCashbook = async (req, res, next) => {
    try {

        const { cashbookId } = req.params
        const findedCashbook = await Cashbook.findById(cashbookId)
        if (!findedCashbook) return next(createError(400, 'Cashbook not exist'))

        const deletedCashbook = await Cashbook.findByIdAndDelete(cashbookId)
        res.status(200).json({ result: deletedCashbook, message: 'cashbook deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Cashbook.deleteMany()
        res.status(200).json({ result, message: 'Cashbook collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}