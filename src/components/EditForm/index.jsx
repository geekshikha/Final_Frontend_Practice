import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserSpace } from "../../store/user/selectors";
import { updateMySpaceThunk } from "../../store/user/actions";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const EditFormButton = () => {
  const startingState = useSelector(selectUserSpace);
  const dispatch = useDispatch();

  // console.log("startingState", startingState);

  // const inputState = startingState.space;

  const [title, setTitle] = useState(startingState.title);
  const [description, setDescription] = useState(startingState.description);
  const [backgroundColor, setBackground] = useState(
    startingState.backgroundColor
  );
  const [textColor, setTextColor] = useState(startingState.color);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMySpaceThunk(title, description, backgroundColor, textColor) //! don't use "useEffect" to dispatch thunks---- need to be action taken by user
    );
    navigate("/myspace");
  };

  if (!startingState) {
    <div>
      <Loading />
    </div>;
  }

  return (
    <div>
      <h2>Edit My Space</h2>

      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "50px",
          padding: "50px",
          width: "50%",
        }}
      >
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontWeight: "lighter" }}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ fontWeight: "lighter" }}
        />
        <label>Background</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackground(e.target.value)}
        />
        <label>Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditFormButton;
