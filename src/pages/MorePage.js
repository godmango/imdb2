import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactPlayer from "react-player";
import "./pages.css";
import api from "../apiService";

const MorePage = () => {
  const params = useParams();
  const [url, setUrl] = useState("");
  const [urlTrail, setUrlTrail] = useState("");
  const [clickedData, setClickedData] = useState([]);
  const [urlData, setUrlData] = useState([]);
  const [type, setType] = useState("");
  const [theId, setTheId] = useState(0);

  // const [typeOf, setTypeOf] = useState("");
  // const [idOf, setIdOf] = useState("");
  useEffect(() => {
    if (params.id.includes(".") === true) {
      let splitted = params.id.split(".");
      setType(splitted[0]);
      setTheId(splitted[1]);
    } else {
      setTheId(params.id);
    }
  }, [params, theId, type]);

  useEffect(() => {
    if (clickedData.config && clickedData.config.url !== "") return;
    if (theId === 0) return;
    const getData = async () => {
      if (type === "movie" || type === "") {
        setUrl(`movie/${theId}?page=1`);
        setUrlTrail(`movie/${theId}/videos?page=1`);
      } else if (type === "tv") {
        setUrl(`tv/${theId}?page=1`);
      } else if (type === "person") {
        setUrl(`person/${theId}?page=1`);
      }

      const res = await api.get(url);
      const res2 = await api.get(urlTrail);
      setClickedData(res);
      setUrlData(res2);
    };
    getData();
  }, [theId, type, url, clickedData, urlTrail, urlData]);

  return (
    <div>
      {(type === "movie" || type === "") &&
        clickedData.config &&
        clickedData.config.url !== "" &&
        clickedData.data !== "/" &&
        urlData.data && (
          <Card className="cardSingle">
            <Card.Header>Featured</Card.Header>
            <Card.Img
              className="imgSingle"
              variant="top"
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${clickedData.data.poster_path}`}
            />
            {urlData.data.results && urlData.data.results[0] !== undefined ? (
              <div className="vid">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${urlData.data.results[0].key}`}
                />
              </div>
            ) : (
              <h3>No Trailer</h3>
            )}

            <Card.Body>
              <Card.Title>{clickedData.data.title}</Card.Title>
              <Card.Text>
                {clickedData.data.overview}
                <br />
                {clickedData.data.release_date}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      {type === "tv" && clickedData.config && clickedData.config.url !== "" && (
        <Card className="cardSingle">
          <Card.Header>Featured</Card.Header>
          <Card.Img
            className="imgSingle"
            variant="top"
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${clickedData.data.poster_path}`}
          />
          <Card.Body>
            <Card.Title>{clickedData.data.name}</Card.Title>
            <Card.Text>{clickedData.data.overview}</Card.Text>
            <div className="genreList">
              {clickedData.data.first_air_date}
              {clickedData.data.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
      {type === "person" &&
        clickedData.config &&
        clickedData.config.url !== "" && (
          <Card className="cardSingle">
            <Card.Header>Featured</Card.Header>
            <Card.Img
              className="imgSingle"
              variant="top"
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${clickedData.data.profile_path}`}
            />

            <Card.Body>
              <Card.Title>{clickedData.data.name}</Card.Title>
              <Card.Text>{clickedData.data.biography}</Card.Text>
              <div>{clickedData.data.birthday}</div>
            </Card.Body>
          </Card>
        )}
    </div>
  );
};

export default MorePage;
