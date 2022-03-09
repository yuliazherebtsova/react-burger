import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  username: string;
  email: string;
  login: string;
  password: string;
};

const userInitialState: TUserState = {
  username: '',
  email: '',
  login: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    postRegisterRequest(state) {
      state.orderRequest = true;
    },
    postRegisterSuccess(state, action: PayloadAction<string>) {
      state.orderFailed = false;
      state.orderRequest = false;
      state.orderNumber = action.payload;
    },
    postRegisterFailed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
    },
  },
});

export const {
  postRegisterRequest,
  postRegisterSuccess,
  postRegisterFailed,
} = userSlice.actions;

export default userSlice.reducer;
