import React from "react";
import "./notes.styles.css"

const Notes = ({data}) => {
    console.log(data)
    const items = data.map((item, index) => {
        return(
        <h1 key={index}>{item.value.content}
            
        </h1>
        );
    });
  return (
    <ul id="timeline" className="timeline">
        {items}
    </ul>
  );
};

export default Notes;