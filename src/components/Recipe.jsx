import React from "react";

const Recipe = ({ title, img, url, host }) => {
  return (
    <article className="p-6 min-h-[440px] bg-[#171e2b] relative rounded-xl max-w-[317.33px]">
      <a href={url}>
        <img src={img} alt={title} className="block mb-3 rounded-xl" />
        <h2 className="text-xl">{title}</h2>
        <p className="absolute bottom-3">Source: {host}</p>
      </a>
    </article>
  );
};

export default Recipe;
