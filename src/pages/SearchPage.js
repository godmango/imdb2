import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import api from "../apiService";

const SearchPage = ({ searchKeyWord }) => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [movies, setMovies] = useState([]);
  // const [movChoise, setMovChoise] = useState("/now_playing?");
  const history = useHistory();
  const params = useParams();

  const handleClick = (itemID, itemType) => {
    history.push(`/more/${itemType}.${itemID}`);

    // history.push(`/reading`);
  };

  useEffect(() => {
    if (searchKeyWord === "") return;
    const getData = async () => {
      let url = `search/multi?page=${pageNum}&query=${params.keyword}`;
      const res = await api.get(url);
      setMovies(res.data.results);
      setTotalPageNum(res.data.total_pages);
    };
    getData();
  }, [pageNum, searchKeyWord, params]);
  return (
    <div>
      <Container>
        <div className="cards">
          {movies &&
            movies.map((item) => (
              <Card key={item.id} style={{ width: "18rem" }}>
                {item.media_type === "movie" && (
                  <>
                    {" "}
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.overview}</Card.Text>
                      <Button
                        onClick={() => handleClick(item.id, item.media_type)}
                        variant="primary"
                      >
                        More information
                      </Button>
                    </Card.Body>{" "}
                  </>
                )}
                {item.media_type === "tv" && (
                  <>
                    {" "}
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.overview}</Card.Text>
                      <Button
                        onClick={() => handleClick(item.id, item.media_type)}
                        variant="primary"
                      >
                        More information
                      </Button>
                    </Card.Body>{" "}
                  </>
                )}
                {item.media_type === "person" && (
                  <>
                    {" "}
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.profile_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.known_for[0].title}</Card.Text>
                      <Button
                        onClick={() => handleClick(item.id, item.media_type)}
                        variant="primary"
                      >
                        More information
                      </Button>
                    </Card.Body>{" "}
                  </>
                )}
              </Card>
            ))}
        </div>

        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
        />
      </Container>
    </div>
  );
};

export default SearchPage;
