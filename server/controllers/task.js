import Task from '../models/task.js'
import User from '../models/user.js'
import { createError, isValidDate } from '../utils/error.js'

export const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, priority } = req.body
        if (!title || !description || !dueDate || !priority) return next(createError(400, 'Make sure to provide all the fields'))

        const newTask = await Task.create({ userId: req?.user?._id, title, description, dueDate, priority })
        res.status(200).json({ result: newTask, message: 'task created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const getTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        // Update task statuses based on criteria before sending the response
        const currentDate = new Date();

        if (task) {
            const dueDate = new Date(task.dueDate);

            if (task.status === 'new' && dueDate <= currentDate) {
                await Task.findByIdAndUpdate(task._id, { status: 'overDue' });
                task.status = 'overDue'; // Update in-memory status as well
            } else if (dueDate > currentDate && task.status === 'overDue') {
                await Task.findByIdAndUpdate(task._id, { status: 'new' });
                task.status = 'new'; // Update in-memory status as well
            }
        }

        res.status(200).json({ result: task, message: 'Task fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};


export const getUserTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });

        const currentDate = new Date();

        for (const task of tasks) {
            const dueDate = new Date(task.dueDate);

            if (task.status === 'new' && dueDate <= currentDate) {
                await Task.findByIdAndUpdate(task._id, { status: 'overDue' });
                task.status = 'overDue'; // Update in-memory status as well
            } else if (dueDate > currentDate && task.status === 'overDue') {
                await Task.findByIdAndUpdate(task._id, { status: 'new' });
                task.status = 'new'; // Update in-memory status as well
            }
        }

        res.status(200).json({ result: tasks, message: 'tasks fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};
export const getArchivedTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id, isArchived: true });

        const currentDate = new Date();

        for (const task of tasks) {
            const dueDate = new Date(task.dueDate);

            if (task.status === 'new' && dueDate <= currentDate) {
                await Task.findByIdAndUpdate(task._id, { status: 'overDue' });
                task.status = 'overDue'; // Update in-memory status as well
            } else if (dueDate > currentDate && task.status === 'overDue') {
                await Task.findByIdAndUpdate(task._id, { status: 'new' });
                task.status = 'new'; // Update in-memory status as well
            }
        }

        res.status(200).json({ result: tasks, message: 'tasks fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const searchTask = async (req, res, next) => {
    const { searchTerm } = req.query;

    const searchPattern = new RegExp(searchTerm, 'i');

    try {
        const matchingUserIds = await User.find({
            $or: [
                { username: searchPattern },
                { email: searchPattern },
                { firstName: searchPattern },
                { lastName: searchPattern },
                { cnic: searchPattern },
            ],
        }).select('_id');

        const searchResults = await Task.find({
            $or: [
                { userId: { $in: matchingUserIds } },
                { title: searchPattern },
                { description: searchPattern },
                { status: searchPattern },
                { priority: searchPattern },
            ],
        })
            .populate('userId')
            .exec();

        res.status(200).json({ result: searchResults });
    } catch (error) {
        next(createError(500, error.message))
    }
};


export const filterTask = async (req, res, next) => {
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = Task.find(filters);

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
            if (query.model.modelName === 'Task') { // Check if the query has not been executed yet
                query = query.where('createdAt').lte(endDate);
            }
        }

        query = await query.populate('userId').exec();
        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const updateTask = async (req, res, next) => {
    try {

        const { taskId } = req.params

        const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: req.body }, { new: true })
        res.status(200).json({ result: updatedTask, message: 'Task updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteTask = async (req, res, next) => {
    try {

        const { taskId } = req.params

        const deletedTask = await Task.findByIdAndDelete(taskId)
        res.status(200).json({ result: deletedTask, message: 'Task deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Task.deleteMany()
        res.status(200).json({ result, message: 'Task collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}