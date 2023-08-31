export const createError = (status, message) => {
    const err = new Error()
    err.message = message
    err.status = status
    return err
}


export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}