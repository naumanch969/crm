import axios from 'axios'
import { baseURL } from '../../constant'
import Cookie from 'js-cookie'


const API = axios.create({ baseURL })

axios.interceptors.request.use((req) => {
    const tokenString = Cookie.get(`profile`)
    if (tokenString) {
        const token = JSON.parse(tokenString)
        req.headers.authtoken = token
    }
    return req
})

// AUTH
export const register = (userData) => API.post(`/auth/register`, userData)
export const login = (userData) => API.post(`/auth/login`, userData)
export const logout = () => API.post(`/auth/logout`)


// USER
export const getUsers = () => API.get(`/user/get/all`)
export const getClients = () => API.get(`/user/get/clients`)
export const getEmployees = () => API.get(`/user/get/employees`)
export const getUser = (userId) => API.get(`/user/get/single/${userId}`)
export const createClient = (clientData) => API.post(`/user/create/client`, clientData)
export const createEmployee = (employeeData) => API.post(`/user/create/employee`, employeeData)
export const updateRole = (userId, role) => API.put(`/user/update-role/${userId}`, { role })
export const updateUser = (userId, userData) => API.put(`/user/update/${userId}`, userData)
export const deleteUser = (userId) => API.delete(`/user/delete/${userId}`)


// TASK
export const getTasks = () => API.get(`/task/get/all`)
export const getTask = (taskId) => API.get(`/task/get/single/${taskId}`)
export const createTask = (taskData) => API.post(`/task/create`, taskData)
export const updateTask = (taskId, taskData) => API.put(`/task/update/${taskId}`, taskData)
export const deleteTask = (taskId) => API.delete(`/task/delete/${taskId}`)


// SALE
export const getSales = () => API.get(`/sale/get/all`)
export const getSale = (saleId) => API.get(`/sale/get/single/${saleId}`)
export const createSale = (saleData) => API.post(`/sale/create`, saleData)
export const updateSale = (saleId, saleData) => API.put(`/sale/update/${saleId}`, saleData)
export const deleteSale = (saleId) => API.delete(`/sale/delete/${saleId}`)


// NOTIFICATIONS
export const getNotifications = () => API.get(`/notification/get/all`)
export const getNotification = (notificationId) => API.get(`/notification/get/single/${notificationId}`)
export const createRequestNotification = (notificationData) => API.get(`/notification/create/request`, notificationData)
export const deleteNotification = (notificationId) => API.delete(`/notification/delete/${notificationId}`)


// MEETING
export const getMeetings = () => API.get(`/meeting/get/all`)
export const getMeeting = (meetingId) => API.get(`/meeting/get/single/${meetingId}`)
export const createMeeting = (meetingData) => API.post(`/meeting/create`, meetingData)
export const updateMeeting = (meetingId) => API.put(`/meeting/update/${meetingId}`)
export const deleteMeeting = (meetingId) => API.delete(`/meeting/delete/${meetingId}`)


// APROVAL
export const getApprovals = (type) => API.get(`/approval/get/all?type=${type}`)
export const getApproval = () => API.get(`/approval/get/single/${approvalId}`)
export const createRequestApproval = (data) => API.post(`/approval/create/request`, data)
export const rejectRequestApproval = (email) => API.post(`/approval/reject/request`, { email })
export const createVoucherApproval = (data) => API.post(`/approval/create/voucher`, data)
export const createReceiptApproval = (data) => API.post(`/approval/create/receipt`, data)
export const createRefundApproval = (data) => API.post(`/approval/create/refund`, data)
export const deleteApproval = (approvalId) => API.delete(`/approval/delete/${approvalId}`)


// LEAD 
export const getLead = (leadId) => API.get(`/lead/get/single/${leadId}`)
export const getLeads = () => API.get(`/lead/get/all`)
export const getLeadsStat = () => API.get(`/lead/get/stats`)
export const createOnsiteLead = (leadData) => API.post(`/lead/create/onsite`, leadData)
export const createOnlineLead = (leadData) => API.post(`/lead/create/online`, leadData)
export const updateLead = (leadId, leadData) => API.put(`/lead/update/${leadId}`, leadData)
export const deleteLead = (leadId) => API.delete(`/lead/delete/${leadId}`)

// PROJECT
export const getProject = (projectId) => API.get(`/project/get/single/${projectId}`)
export const getProjects = () => API.get(`/project/get/all`)
export const getUserAssignedProjectsStats = () => API.get(`/project/get/user_assigned_projects_stats`)
export const createProject = (projectData) => API.post(`/project/create`, projectData)
export const updateProject = (projectId, projectData) => API.put(`/project/update/${projectId}`, projectData)
export const deleteProject = (projectId) => API.delete(`/project/delete/${projectId}`)


// CASHBOOK
export const getCashbook = (cashbookId) => API.get(`/cashbook/get/single/${cashbookId}`)
export const getIncomeAndExpenses = (year) => API.get(`/cashbook/get/income_and_expenses`, { year })
export const getPayments = () => API.get(`/cashbook/get/payments`)
export const getCashbooks = (type) => API.get(`/cashbook/get/all?type=${type}`)
export const createCashbook = (cashbookData) => API.post(`/cashbook/create`, cashbookData)
export const deleteCashbook = (cashbookId) => API.delete(`/cashbook/delete/${cashbookId}`)
