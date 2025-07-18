import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async logout action
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
