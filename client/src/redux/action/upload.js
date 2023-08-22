import {
    start,
    error,
    end,
    uploadImageReducer,
    deleteImageReducer,

} from "../reducer/upload";
import * as api from '../api/index'
import { rootURL } from "../../constant";


export const uploadImage = (formData, isMultiple) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.uploadImage(formData)
        dispatch(uploadImageReducer({ result: data.result, isMultiple }))
        dispatch(end())
    } catch (err) {
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
        dispatch(error(err.message))
    }
}