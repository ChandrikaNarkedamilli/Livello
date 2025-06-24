import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";


export const fetchUsers = createAsyncThunk('users/fetch',async(page=1,{rejectWithValue}) => {
  try {
    const response = await axios.get(`/users?page=${page}`)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
})

const userSlice = createSlice({
  name : 'users',
  initialState : {
    users :[],
    loading : false,
    error : false,
    currentPage : 1,
    totalPages : 1,
  },
  extraReducers : (builder) => {
    builder
      .addCase(fetchUsers.pending, (state)=> {
        state.loading  =true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled,(state,action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.currentPage =action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action)=> {
        state.loading = false;
        state.error = action.payload
      })
  }
})

export default userSlice.reducer;