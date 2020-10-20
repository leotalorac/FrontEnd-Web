import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Container from 'react-bootstrap/Container'
import "./notes.styles.css"

const Notes = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  let items = [];
  for (let number = 1; number <= Math.ceil(props.notes.length / postsPerPage); number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => setCurrentPage(number)} active={number === currentPage}>
        {number}
      </Pagination.Item>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const notes = props.notes.map((row,i) => {
    return (
      <li className="card-element" >
    <a href="#">
    <h2 className="card-title" >Title {<i></i>}</h2>
      <p className="card-content">{row.value.content}</p>
    </a>
  </li>
    );
  });

  const currentNotes = notes.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container style={{ textAlign: "center" }}>
      <ul className="card-list" >
        {currentNotes}
      </ul>
      <Pagination className="text-center" size="sm">{items}</Pagination>
    </Container>
  );
};

export default Notes;