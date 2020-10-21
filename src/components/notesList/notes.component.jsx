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
 
  const notes =  [...props.notes].reverse().map((row,i) => {
    return (
      <li className="card-element" >
    <a href="#">
    <h2 className="card-title" >Note {i+1}</h2>
      <p className="card-content">{row.content}</p>
    </a>
  </li>
    );
  });

  let currentNotes = notes.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <Container style={{ textAlign: "center" }}>
      <ul className="card-list" >
        {currentNotes}
      </ul>
      <Pagination  size="sm">
      <Pagination.First onClick={() => setCurrentPage(1)} />
        {items}
        <Pagination.Last onClick={() => setCurrentPage(Math.ceil(props.notes.length / postsPerPage))} />
      </Pagination>
    </Container>
  );
};

function temporarySwap(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}

export default Notes;