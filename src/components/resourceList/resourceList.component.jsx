import React from "react";
import Resource from "../resource/resource.component"
import "./resourceList.styles.css"

const ResourceList = ({data}) => {
    console.log(data)
    const items = data.map((row) => {
        return(
            <Resource row={row} />
        );
    });
    console.log(items)
  return (
    <ul id="timeline" className="timeline">
        {items}
    </ul>
  );
};

export default ResourceList;