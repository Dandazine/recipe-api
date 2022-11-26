import React from "react";

const Recipe = ({ title, img, url, host }) => {
  return (
    <article className="bg-[#171e2b] hover:bg-[#232e42] relative rounded-xl ">
      <a href={url} className="block p-6 min-h-[440px] max-w-[317.33px]">
        <img src={img} alt={title} className="block mb-3 rounded-xl" />
        <h2 className="text-xl">{title}</h2>
        <p className="absolute bottom-3">Source: {host}</p>
      </a>
    </article>
  );
};

export default Recipe;
