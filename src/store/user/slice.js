import { createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit"; //! import current

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
      //console.log("sliceupdate:", current(state.profile)); //! to console.log on thunk use current variable imported from "@reduxjs/toolkit"

      // action.payload ==== space
      // TODO Check - use this line code to update whole profile state
      // state.profile = {
      //   ...state.profile
      //   // ...action.payload.profile, // null
      //   // space: state.profile.space,
      //   // stories: state.profile.space.stories,
      // };
      const updatedSpace = action.payload;
      state.profile.space = {
        ...updatedSpace,
        stories: state.profile.space.stories,
      };
      // stories: state.profile.space.stories
      // console.log("spaceNewUpdate:", current(state.profile.space));

      // TODO Check - does below line even exist
      //! dont use this structure like state.profile.space --- bcoz this state doesn't exist on initialState only token & profile is there -- so try to update state.profile-- and profile is object - update that object thing inside curly braces and updation space and stories there separately
      //  state.profile.space = {
      //   ...action.payload.profile.space,

      //    stories: state.profile.space.stories,
      // };

      //* console.log("NewStoryUpdate:", current(state.profile.space.stories));

      //* console.log("sliceupdate:", state.profile);
      // state.space = { ...action.payload, stories: state.space.stories };
    },
    storyDelete: (state, action) => {
      //! im gonna need the storyId => action.payload
      // [{}, {}, {}]   .filter(s => s.id !== storyId) //! filter keeps the element which returns true so use !-not operator
      // id
      //* state.profile = console.log("storyId?", current(action.payload));
      const storyId = parseInt(action.payload);
      state.profile.space.stories = state.profile.space.stories.filter(
        (story) => story.id !== storyId
      );
    },
    postStory: (state, action) => {
      // state.profile = {};

      const newStoryPost = action.payload;
      console.log("im in the slice", newStoryPost);
      state.profile.space.stories.push(newStoryPost);
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  spaceUpdate,
  storyDelete,
  postStory,
} = userSlice.actions;

export default userSlice.reducer;
