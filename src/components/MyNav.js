import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import logo from "../pictures/imdbLogo.jpeg";

const MyNav = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let theWord = e.target[0].value;
    setSearchKeyWord(theWord);
  };
  return (
    <Navbar className="theNav" bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img className="logoSize" src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/popular">
            Popular
          </Nav.Link>
          <Nav.Link as={NavLink} to="/top_rated">
            Top Rated
          </Nav.Link>
        </Nav>
        <Form onSubmit={(e) => handleSubmit(e)} inline>
          <FormControl
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
          />
          <Button type="submit" variant="outline-success">
            {searchKeyWord && (
              <Redirect as={NavLink} to={`/search/${searchKeyWord}`} />
            )}
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
