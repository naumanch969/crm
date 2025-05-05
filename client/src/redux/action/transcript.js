import toast from 'react-hot-toast'
import * as api from '../api'
import { start, createTranscriptReducer, deleteTranscriptReducer, end, error, getTranscriptReducer, getTranscriptsReducer, updateTranscriptReducer } from '../reducer/transcript'


export const getTranscript = (transcriptId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getTranscript(transcriptId)
        dispatch(getTranscriptReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const getTranscripts = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getTranscripts()
        dispatch(getTranscriptsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const createTranscript = (transcript) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createTranscript(transcript)
        dispatch(createTranscriptReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const updateTranscript = (transcriptId, transcript) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateTranscript(transcriptId, transcript)
        dispatch(updateTranscriptReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const deleteTranscript = (transcriptId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteTranscript(transcriptId)
        dispatch(deleteTranscriptReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}