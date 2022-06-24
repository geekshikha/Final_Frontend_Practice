import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpaceDetailsThunk } from "../store/space/thunks";
import { spaceDetailSelector } from "../store/space/selectors";
import HeroBanner from "../components/HeroBanner";
import Loading from "../components/Loading";

const DetailPage = () => {
  const params = useParams();

  // console.log("params", params);
  const spaceDetailsData = useSelector(spaceDetailSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSpaceDetailsThunk(params.id));
  }, [dispatch, params.id]);
  //! if object only display using dot notation on selector variable -- no need to map
  // console.log("spaceDetailsData", spaceDetailsData);

  if (!spaceDetailsData)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: `${spaceDetailsData.backgroundColor}`,
          color: `${spaceDetailsData.color}`,
          margin: 2,
          padding: 14,
        }}
      >
        <HeroBanner>
          <h1>DetailPage</h1>
        </HeroBanner>

        {spaceDetailsData.id}
        <h2>{spaceDetailsData.title}</h2>
        <p>{spaceDetailsData.description}</p>
        <p>{spaceDetailsData.backgroundColor}</p>
      </div>

      {spaceDetailsData.stories.map((story) => {
        return (
          <div key={story.id} style={{ textAlign: "center" }}>
            <h2>{story.name}</h2>
            <p>{story.content}</p>
            <img src={story.imageUrl} alt="" style={{ width: 80 }} />
          </div>
        );
      })}
    </div>
  );
};

export default DetailPage;
