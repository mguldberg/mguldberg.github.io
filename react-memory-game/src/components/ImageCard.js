import React from "react";
import "./ImageCard.css";

const ImageCard = props => (
  <div className="card">
      <div className="img-container">
        <img className="img-fluid" alt={props.imageAlt} src={props.imageSrc} id={props.imageId} key={props.key} onClick={() => props.imageFn(props.imageId)}/>
      </div>
  </div>
);

export default ImageCard;
