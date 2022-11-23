import React from "react";

const Recipe = ({ title, img, url }) => {
  return (
    <article>
      <a href={url}>
        <img src={img} alt={title} />
        <h1>{title}</h1>
      </a>
    </article>
  );
};

export default Recipe;
