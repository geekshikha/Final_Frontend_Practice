import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpaceDetailsThunk } from "../store/space/thunks";
import { spaceDetailSelector } from "../store/space/selectors";
import HeroBanner from "../components/HeroBanner";

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
  return (
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
  );
};

export default DetailPage;
