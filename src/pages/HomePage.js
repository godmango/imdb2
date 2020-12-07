import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import api from "../apiService";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [movies, setMovies] = useState([]);
  const [errorMess, setErrorMess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleClick = (itemID) => {
    history.push(`/more/${itemID}`);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let url = `movie/now_playing?page=${pageNum}`;
        const res = await api.get(url);
        setMovies(res.data.results);
        setTotalPageNum(res.data.total_pages);
        setErrorMess("");
        setLoading(false);
      } catch (error) {
        setErrorMess(error.message);
      }
    };
    getData();
  }, [pageNum]);
  return (
    <div>
      <Container className="containerWidth">
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <>
            {errorMess && <Alert variant="danger">{errorMess}</Alert>}
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
            <div className="getToCenter">
              <PaginationBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
export default HomePage;
