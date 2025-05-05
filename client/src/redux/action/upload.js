import { start, error, end, uploadImageReducer, deleteImageReducer, } from "../reducer/upload";
import * as api from '../api/index'
import toast from "react-hot-toast";


export const uploadImage = (formData, isMultiple) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.uploadImage(formData)
        dispatch(uploadImageReducer({ result: data.result, isMultiple }))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}


export const deleteImage = (filename, isMultiple) => async (dispatch) => {
    try {
        dispatch(start())
        await api.deleteImage(filename)
        dispatch(deleteImageReducer({ filename, isMultiple }))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}