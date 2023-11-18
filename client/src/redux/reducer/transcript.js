import { createSlice } from "@reduxjs/toolkit";

const transcriptSlice = createSlice({

    name: 'transcript',
    initialState: {
        isFetching: false,
        error: null,
        transcripts: [],
        currentTranscript: null,
    },

    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },
        getTranscriptsReducer: (state, action) => { state.transcripts = action.payload },
        getTranscriptReducer: (state, action) => { state.currentTranscript = action.payload },
        createTranscriptReducer: (state, action) => { state.transcripts = [...state.transcripts, action.payload] },
        updateTranscriptReducer: (state, action) => { state.transcripts = state.transcripts.map(d => d = d._id == action.payload._id ? action.payload : d) },
        deleteTranscriptReducer: (state, action) => { state.transcripts = state.transcripts.filter(d => d._id != action.payload._id) },
    }

})

export const {
    start,
    end,
    error,
    getTranscriptsReducer,
    getTranscriptReducer,
    createTranscriptReducer,
    updateTranscriptReducer,
    deleteTranscriptReducer,
} = transcriptSlice.actions

export default transcriptSlice.reducer