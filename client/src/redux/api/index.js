import axios from 'axios'
import { baseURL } from '../../constant'
import Cookie from 'js-cookie'


const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {
    const profileString = Cookie.get(`crm_profile`)
    if (profileString) {
        const profile = JSON.parse(profileString)
        req.headers.authtoken = profile.token
    }
    return req
})

const objectToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // Check if the value is null, undefined, or an empty string
            if (value != null && value != undefined && value != '') {
                // Encode both the key and value to handle special characters
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                keyValuePairs.push(`${encodedKey}=${encodedValue}`);
            }
        }
    }
    // Join the key-value pairs with '&' to form the query string
    return keyValuePairs.join('&');
}



// UPLOAD
export const uploadImage = (image) => API.post(`/upload_image`, image)
export const deleteImage = (filename) => API.delete(`/delete_image/${filename}`)

// AUTH
export const register = (userData) => API.post(`/auth/register`, userData)
export const login = (userData) => API.post(`/auth/login`, userData)
export const changePassword = (passwordData) => API.put(`/auth/change_password`, passwordData)
export const forget_password = (passwordData) => API.put(`/auth/forget_password`, passwordData)
export const newpassword = (passwordData) => API.put(`/auth/newpassword`, passwordData)


// USER
export const getUsers = () => API.get(`/user/get/all`)
export const getClients = () => API.get(`/user/get/clients`)
export const getEmployees = () => API.get(`/user/get/employees`)
export const getEmployeeClients = () => API.get(`/user/get/clients/employee`)
export const getUser = (userId) => API.get(`/user/get/single/${userId}`)
export const createClient = (clientData) => API.post(`/user/create/client`, clientData)
export const createEmployee = (employeeData) => API.post(`/user/create/employee`, employeeData)
export const updateRole = (userId, role) => API.put(`/user/update-role/${userId}`, { role })
export const updateUser = (userId, userData) => API.put(`/user/update/${userId}`, userData)
export const deleteUser = (userId) => API.delete(`/user/delete/${userId}`)


// TASK
export const getTasks = () => API.get(`/task/get/all`)
export const getTask = (taskId) => API.get(`/task/get/single/${taskId}`)
export const searchTask = (searchTerm) => API.get(`/task/search?searchTerm=${searchTerm}`)
export const filterTask = (filters) => API.get(`/task/filter?${objectToQueryString(filters)}`)
export const createTask = (taskData) => API.post(`/task/create`, taskData)
export const updateTask = (taskId, taskData) => API.put(`/task/update/${taskId}`, taskData)
export const deleteTask = (taskId) => API.delete(`/task/delete/${taskId}`)

// PROJECT
export const getProject = (projectId) => API.get(`/project/get/single/${projectId}`)
export const getProjects = () => API.get(`/project/get/all`)
export const searchProject = (searchTerm, isArchived) => API.get(`/project/search?searchTerm=${searchTerm}`, { isArchived })
export const filterProject = (filters) => API.get(`/project/filter?${objectToQueryString(filters)}`)
export const createProject = (projectData) => API.post(`/project/create`, projectData)
export const updateProject = (projectId, projectData) => API.put(`/project/update/${projectId}`, projectData)
export const deleteProject = (projectId) => API.delete(`/project/delete/${projectId}`)

// SOCIETY
export const getSociety = (societyId) => API.get(`/society/get/single/${societyId}`)
export const getSocieties = () => API.get(`/society/get/all`)
export const searchSociety = (searchTerm, isArchived) => API.get(`/society/search?searchTerm=${searchTerm}`, { isArchived })
export const filterSociety = (filters) => API.get(`/society/filter?${objectToQueryString(filters)}`)
export const createSociety = (societyData) => API.post(`/society/create`, societyData)
export const updateSociety = (societyId, societyData) => API.put(`/society/update/${societyId}`, societyData)
export const deleteSociety = (societyId) => API.delete(`/society/delete/${societyId}`)

// INVENTORY
export const getInventory = (inventoryId) => API.get(`/inventory/get/single/${inventoryId}`)
export const getInventories = () => API.get(`/inventory/get/all`)
export const getEmployeeInventories = () => API.get(`/inventory/get/employee`)
export const searchInventory = (searchTerm, isArchived) => API.get(`/inventory/search?searchTerm=${searchTerm}`, { isArchived })
export const filterInventory = (filters) => API.get(`/inventory/filter?${objectToQueryString(filters)}`)
export const createInventory = (inventoryData) => API.post(`/inventory/create`, inventoryData)
export const updateInventory = (inventoryId, inventoryData) => API.put(`/inventory/update/${inventoryId}`, inventoryData)
export const deleteInventory = (inventoryId) => API.delete(`/inventory/delete/${inventoryId}`)

// SALE
export const getSales = () => API.get(`/sale/get/all`)
export const getEmployeeSales = () => API.get(`/sale/get/employee`)
export const getLeadSales = (leadId) => API.get(`/sale/get/lead?leadId=${leadId}`)
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
export const getEvents = () => API.get(`/event/get/all`)
export const getEmployeeEvents = () => API.get(`/event/get/employee`)
export const getEvent = (eventId) => API.get(`/event/get/single/${eventId}`)
export const createEvent = (eventData) => API.post(`/event/create`, eventData)
export const updateEvent = (eventId, eventData) => API.put(`/event/update/${eventId}`, eventData)
export const deleteEvent = (eventId) => API.delete(`/event/delete/${eventId}`)


// APROVAL
export const getApprovals = (type, leadId) => API.get(`/approval/get/all?type=${type}`)
export const getApproval = () => API.get(`/approval/get/single/${approvalId}`)
export const createVoucherApproval = (data) => API.post(`/approval/create/voucher`, data)
export const acceptVoucherApproval = (approvalId, password) => API.post(`/approval/accept/voucher/${approvalId}`, { password })
export const rejectVoucherApproval = (approvalId, password) => API.post(`/approval/reject/voucher/${approvalId}`, { password })
export const createReceiptApproval = (data) => API.post(`/approval/create/receipt`, data)
export const createRefundApproval = (data) => API.post(`/approval/create/refund`, data)
export const deleteApproval = (approvalId) => API.delete(`/approval/delete/${approvalId}`,)


// LEAD 
export const getLead = (leadId) => API.get(`/lead/get/single/${leadId}`)
export const getLeadByPhone = (phone) => API.get(`/lead/get/phone/${phone}`)
export const getLeads = () => API.get(`/lead/get/all`)
export const getEmployeeLeads = () => API.get(`/lead/get/employee`)
export const getLeadsStat = (type) => API.get(`/lead/get/stats?type=${type}`)
export const searchLead = (searchTerm) => API.get(`/lead/search?searchTerm=${searchTerm}`)
export const filterLead = (filters) => API.get(`/lead/filter?${objectToQueryString(filters)}`)
export const createLead = (leadData) => API.post(`/lead/create`, leadData)
export const updateLead = (leadId, leadData) => API.put(`/lead/update/${leadId}`, leadData)
export const shiftLead = (leadId, shiftTo) => API.put(`/lead/update/shift/${leadId}`, { shiftTo })
export const shareLead = (leadId, shareWith) => API.put(`/lead/update/share/${leadId}`, { shareWith })
export const archiveLead = (leadId) => API.put(`/lead/archive/${leadId}`)
export const deleteLead = (leadId) => API.delete(`/lead/delete/${leadId}`)

// FOLLOW UPS
export const getFollowUp = (followUpId) => API.get(`/followUp/get/single/${followUpId}`)
export const getFollowUps = (leadId) => API.get(`/followUp/get/all/${leadId}`)
export const getEmployeeFollowUps = (leadId) => API.get(`/followUp/get/employee/${leadId}`)
export const getFollowUpsStats = () => API.get(`/followUp/get/stats`)
export const getEmployeeFollowUpsStats = () => API.get(`/followUp/get/stats/employee`)
export const createFollowUp = (followUpData) => API.post(`/followUp/create`, followUpData)
export const deleteFollowUp = (followUpId) => API.delete(`/followUp/delete/${followUpId}',`)

// REFUND
export const getRefund = (refundId) => API.get(`/refund/get/single/${refundId}`)
export const getRefunds = () => API.get(`/refund/get/all`)
export const getLeadRefunds = (leadId) => API.get(`/refund/get/lead?leadId=${leadId}`)
export const createRefund = (refundData) => API.post(`/refund/create`, refundData)
export const updateRefund = (refundId, refundData) => API.put(`/refund/update/${refundId}`, refundData)
export const acceptRefund = (refundId, cashbookData) => API.put(`/refund/accept/${refundId}`, cashbookData) // on successful approval, cashbook out should be generated
export const rejectRefund = (refundId, password) => API.put(`/refund/reject/${refundId}`, { password })
export const deleteRefund = (refundId) => API.delete(`/refund/delete/${refundId}`)

// CASHBOOK
export const getCashbook = (cashbookId) => API.get(`/cashbook/get/single/${cashbookId}`)
export const getIncomeAndExpenses = (year) => API.get(`/cashbook/get/income_and_expenses`, { year })
export const getSpecificDateCashbook = (date) => API.get(`/cashbook/get/date/${date}`)
export const getPayments = () => API.get(`/cashbook/get/payments`)
export const getCashbooks = (type) => API.get(`/cashbook/get/all?type=${type}`)
export const getEmployeeCashbooks = (type) => API.get(`/cashbook/get/employee?type=${type}`)
export const getLeadCashbooks = (leadId) => API.get(`/cashbook/get/lead?leadId=${leadId}`)
export const createCashbook = (cashbookData) => API.post(`/cashbook/create`, cashbookData)
export const deleteCashbook = (cashbookId) => API.delete(`/cashbook/delete/${cashbookId}`)


// VOUCHER
export const getVoucher = (voucherId) => API.get(`/voucher/get/single/${voucherId}`)
export const getVouchers = () => API.get(`/voucher/get/all`)
export const getEmployeeVouchers = () => API.get(`/voucher/get/employee`)
export const createVoucher = (voucherData) => API.post(`/voucher/create`, voucherData)
export const deleteVoucher = (voucherId) => API.delete(`/voucher/delete/${voucherId}`)

// DEDUCTION
export const getDeduction = (deductionId) => API.get(`/deduction/get/single/${deductionId}`)
export const getDeductions = () => API.get(`/deduction/get/all`)
export const createDeduction = (deductionData) => API.post(`/deduction/create`, deductionData)
export const updateDeduction = (deductionId, deductionData) => API.put(`/deduction/update/${deductionId}`, deductionData)
export const deleteDeduction = (deductionId) => API.delete(`/deduction/delete/${deductionId}`)

// TRANSCRIPT
export const getTranscript = (transcriptId) => API.get(`/trasncript/get/single/${transcriptId}`)
export const getTranscripts = () => API.get(`/trasncript/get/all`)
export const createTranscript = (transcriptData) => API.post(`/trasncript/create`, transcriptData)
export const updateTranscript = (transcriptId, transcriptData) => API.put(`/trasncript/update/${transcriptId}`, transcriptData)
export const deleteTranscript = (transcriptId) => API.delete(`/trasncript/delete/${transcriptId}`)