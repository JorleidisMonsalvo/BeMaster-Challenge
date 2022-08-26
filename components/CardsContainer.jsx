import React from "react";
import Link from "next/link";
const CardsContainer = ({ cards, title }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="slides-container" style={{height: '450px'}}>
      <h1>{title}</h1>
      <div className="cards-container">
        {cards.map((card) => (
          <Link href={`/movies/${card.id}`} key={card.id}>
            <div className="img-card">
              <img src={`${baseImgUrl}/${card.poster_path}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
