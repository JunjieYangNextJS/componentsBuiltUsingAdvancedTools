import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    'posts/getPosts'
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        status: null
    },
    extraReducers {

    }
})