import { createSlice, current } from "@reduxjs/toolkit"; //! import current

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    spaceUpdate: (state, action) => {
      console.log("sliceupdate:", current(state.profile)); //! to console.log on thunk use current variable imported from "@reduxjs/toolkit"

      // TODO Check - use this line code to update whole profile state
      state.profile = {
        ...action.payload.profile,
        space: state.profile.space,
        stories: state.profile.space.stories,
      };
      console.log("spaceNewUpdate:", current(state.profile.space));

      // TODO Check - does below line even exist
      //! dont use this structure like state.profile.space --- bcoz this state doesn't exist on initialState only token $ prifile is there -- so try to update state.profile-- and profile is object - update that object thing inside curly braces and updation space and stories there separately
      //  state.profile.space = {
      //   ...action.payload.profile.space,

      //    stories: state.profile.space.stories,
      // };

      console.log("NewStoryUpdate:", current(state.profile.space.stories));

      // console.log("sliceupdate:", state.profile);
      // state.space = { ...action.payload, stories: state.space.stories };
    },
  },
});

export const { loginSuccess, logOut, tokenStillValid, spaceUpdate } =
  userSlice.actions;

export default userSlice.reducer;
