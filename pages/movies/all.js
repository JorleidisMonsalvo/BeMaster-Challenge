import { useEffect, useState } from "react";
import PreviewCard from "../../components/PreviewCard";
import { useStateContext } from "../../context/StateContext";

const Movies = () => {
  const { movies } = useStateContext();

  return (
    <div className="content-container">
      {movies?.map((el) => (
        <PreviewCard
          key={el.id}
          title={el.title}
          img={`https://image.tmdb.org/t/p/original${el.poster_path}`}
          votes={el.vote_average}
          vote_count = {el.vote_count}
          type='movies'
          id={el.id}
        />
      ))}
    </div>
  );
};

export default Movies;
