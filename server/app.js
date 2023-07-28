import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import notificationRoutes from './routes/notification.js'
import saleRoutes from './routes/sale.js'
import taskRoutes from './routes/task.js'
import meetingRoutes from './routes/meeting.js'
import approvalRoutes from './routes/approval.js'

dotenv.config()
const app = express()
const CONNECTION_URL = process.env.ATLAS_URL
// const CONNECTION_URL = process.env.COMPASS_URL

const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())

// 5160620247012743

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/notification', notificationRoutes)
app.use('/api/v1/task', taskRoutes)
app.use('/api/v1/meeting', meetingRoutes)
app.use('/api/v1/approval', approvalRoutes)
app.use('/api/v1/sale', saleRoutes)

console.log('just for checking the git pull.')

app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong.'
    const status = err.status || 500
    res.status(status).json({ message, status, stack: err.stack })
    next()
})


mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('listening at port ' + PORT)))
    .catch((err) => console.log('error in connection with mongoDB = \n', err))