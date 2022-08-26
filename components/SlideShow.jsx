import { Slide } from "react-slideshow-image";
import Link from "next/link";
import "react-slideshow-image/dist/styles.css";

const SlideShow = ({ title, data }) => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/original/'
  return (
    <div className="slides-container">
      <h3>{title}</h3>
      <div className="cards-container" style={{height: '500px'}}>
      {data.map((card) => (
          <Link href={`/movies/${card.id}`} key={card.id}>
            <div className="popularity-card" style={{backgroundImage: `url(${baseImgUrl}/${card.backdrop_path})`}}>
              <span>{card.title ? card.title : card.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
