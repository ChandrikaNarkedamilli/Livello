import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const login = createAsyncThunk('auth/login', async(credentials ,{rejectWithValue})=> {
  try {
    const response = await axios.post('/auth/login',credentials)
    return response.data.user
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  } 
})

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    user : null,
    loading : false,
    error : null
  },
  reducers : {
    logout : (state) => {
      state.user = null,
      state.error = null
    },
    updateUser: (state, action) => {
    state.user = { ...state.user, ...action.payload };
  }
  },
  extraReducers : (builder)=> {
    builder
      .addCase(login.pending, (state)=> {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) =>{
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected,(state,action)=> {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const {logout, updateUser} = authSlice.actions;
export default authSlice.reducer;