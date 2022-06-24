import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import Loading from "../components/Loading";
import EditFormButton from "../components/EditForm";
import PostStoryButton from "../components/PostStoryForm";

const MySpacePage = () => {
  const mySpaceData = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [postStory, setPostStory] = useState(false);

  // console.log("mySpaceData:", mySpaceData);

  return (
    <div>
      <h2> MySpacePage</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <button
          style={{ marginRight: 50 }}
          onClick={() => setEditMode(!editMode)}
        >
          Edit my space
        </button>
        <button onClick={() => setPostStory(!postStory)}>
          Post a cool story bro
        </button>
      </div>

      {!mySpaceData ? (
        <Loading />
      ) : (
        <div
          style={{
            backgroundColor: `${mySpaceData.space.backgroundColor}`,
            color: `${mySpaceData.space.color}`,
            textAlign: "center",
          }}
        >
          <h2>{mySpaceData.name}</h2>
          <h3>{mySpaceData.email}</h3>
          <h3>{mySpaceData.space.title}</h3>
          <p>
            {mySpaceData.space.description
              ? mySpaceData.space.description
              : "Write something"}
          </p>
          {mySpaceData.space.stories.length !== 0
            ? mySpaceData.space.stories.map((story) => {
                return (
                  <div key={story.id}>
                    <p>{story.content}</p>
                    <img src={story.imageUrl} alt="" style={{ width: 70 }} />
                    <button
                      style={{
                        background: "blue",
                        borderRadius: 10,
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            : "No stories yet"}
        </div>
      )}

      {editMode && (
        <div>
          <EditFormButton />
        </div>
      )}

      {postStory && (
        <div>
          <PostStoryButton />
        </div>
      )}
    </div>
  );
};

export default MySpacePage;
