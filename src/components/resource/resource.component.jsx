import React from "react";
import "./resource.styles.css"
const Resource = ({row}) => {

  return (
    <li className="animated fadeIn fast">
      <div className="avatar">
        <img src={"img/"+ row.icon +".jpg"} />
      </div>
      <div className="bubble-container">
        <div className="bubble">
          <h6>{row.name}</h6>
          {row.text}
        </div>
        <div className="arrow"></div>
      </div>
    </li>
  );
};

export default Resource;