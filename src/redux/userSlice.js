// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    nickname: "",
  },
  reducers: {
    setNickname(state, action) {
      state.nickname = action.payload;
    },
  },
});

export const { setNickname } = userSlice.actions;
export default userSlice.reducer;
