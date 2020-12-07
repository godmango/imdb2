import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import api from "../apiService";
import "./pages.css";

const PopularPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [movies, setMovies] = useState([]);
  // const [movChoise, setMovChoise] = useState("/now_playing?");

  const history = useHistory();

  const handleClick = (itemID) => {
    history.push(`/more/${itemID}`);

    // history.push(`/reading`);
  };

  useEffect(() => {
    const getData = async () => {
      let url = `movie/popular?page=${pageNum}`;
      const res = await api.get(url);
      setMovies(res.data.results);
      setTotalPageNum(res.data.total_pages);
    };
    getData();
  }, [pageNum]);
  return (
    <div>
      <Container>
        <div className="cards">
          {movies &&
            movies.map((item) => (
              <Card key={item.id} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.overview}</Card.Text>
                  <Button
                    onClick={() => handleClick(item.id)}
                    variant="primary"
                  >
                    More information
                  </Button>
                </Card.Body>
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

export default PopularPage;
