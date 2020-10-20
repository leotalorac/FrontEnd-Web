import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
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

  const notes = props.notes.map(row => {
    return(
        <p>{row.name}</p>
    );
});

  const currentNotes = notes.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      {currentNotes}
      <Pagination size="sm">{items}</Pagination>

    </div>
  );
};

export default Notes;