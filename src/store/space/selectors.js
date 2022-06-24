export const spaceSelector = (reduxState) => reduxState.space.spaces;

export const spaceDetailSelector = (reduxState) =>
  reduxState.space.spaceDetails;

export const storySelector = (reducstate) =>
  reducstate.space.spaceDetails?.stories;
