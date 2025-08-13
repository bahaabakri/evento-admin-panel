// store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@/types/user.type';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken, removeAuthToken, setAuthToken } from '@/services/auth-cookie';
import { request } from '@/services/api';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

export const checkIsAuthenticated = createAsyncThunk(
  'auth/checkIsAuthenticated',
  async (_, thunkAPI) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No token');

      const decoded = jwtDecode<{ exp: number, sub: string }>(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now) {
        removeAuthToken();
        throw new Error('Token expired');
      }

      const res = await request<{ user: User }>('get', 'users/me');
      return res.user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return thunkAPI.rejectWithValue('Unauthorized');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeAuthenticatedUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      removeAuthToken();
    },
    setAuthenticatedUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      setAuthToken(action.payload.access_token)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIsAuthenticated.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIsAuthenticated.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkIsAuthenticated.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { removeAuthenticatedUser, setAuthenticatedUser } = authSlice.actions;
export default authSlice.reducer;