import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postMyStoryThunk } from "../../store/user/actions";

const PostStoryButton = () => {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

  const dispatch = useDispatch();

  const submitPostForm = (e) => {
    e.preventDefault();
    dispatch(postMyStoryThunk(name, content, image));
  };

  return (
    <div>
      <h2>Post Your Story</h2>
      <form
        onSubmit={submitPostForm}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "50px",
          padding: "50px",
          width: "50%",
        }}
      >
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Content</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Image Url</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image ? <image src={image} alt="preview" thumbnail /> : null}
        <button
          type="submit"
          style={{ backgroundColor: "lightgreen", margin: 20 }}
        >
          Post!
        </button>
      </form>
    </div>
  );
};

export default PostStoryButton;
