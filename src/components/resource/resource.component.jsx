import React from "react";
import "./resource.styles.css"
import img from "../../assets/images/logo.png"
const Resource = ({row}) => {

  return (
    <li className="animated fadeIn fast">
      <div className="avatar">
        <img src={img} />
      </div>
      <div className="bubble-container">
        <div className="bubble">
          <h6>{row.idUser}</h6>
          {row.content}
        </div>
        <div className="arrow"></div>
      </div>
    </li>
  );
};

export default Resource;