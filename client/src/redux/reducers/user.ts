import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'A332315',
  password: '123456',
  role: 'user'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAll(state) {

    }
  }
})

export const { getAll } = userSlice.actions;
export default userSlice.reducer;
