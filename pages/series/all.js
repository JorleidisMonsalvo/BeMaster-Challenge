import { useStateContext } from "../../context/StateContext";
import PreviewCard from "../../components/PreviewCard";
const Series = () => {
  const { series } = useStateContext();
  return (
    <div className="content-container">
      {series?.map((el) => (
        <PreviewCard
          key={el.id}
          title={el.name}
          img={`https://image.tmdb.org/t/p/original${el.poster_path}`}
          votes={el.vote_average}
          vote_count={el.vote_count}
          type='series'
          id={el.id}
        />
      ))}
    </div>
  );
};

export default Series;
