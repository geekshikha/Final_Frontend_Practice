export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user.profile;

export const selectUserSpace = (state) => state.user.profile.space;

export const selectUserStory = (reduxState) =>
  reduxState.user.profile.space.stories;
