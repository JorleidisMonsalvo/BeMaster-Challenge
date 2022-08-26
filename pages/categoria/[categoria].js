import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import SlideShow from "../../components/SlideShow";
import CardsContainer from "../../components/CardsContainer";
function ContentCategory() {
  const router = useRouter();
  const { categoria } = router.query;
  const categoryData = categoria?.split("=");
  const [movies, setMovies] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/discover/movie/`,
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        with_genres: categoryData?.[1],
        language: "es",
      },
    }).then((response) => {
      setMovies(response.data.results);
    });

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/discover/tv`,
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        with_genres: categoryData?.[1],
        language: "es",
      },
    }).then((response) => {
      setSeries(response.data.results);
    });
  }, []);

  return (
    <div>
      {movies && series ? (
        <div>
          {movies?.length > 0 && (
            <SlideShow
              title={`Peliculas de ${categoryData?.[0]} más populares`}
              data={movies.slice(0, 5)}
            />
          )}
          {series?.length > 0 && (
            <SlideShow
              title={`Series más populares`}
              data={series.slice(0, 5)}
            />
          )}
          {movies?.length > 0 && (
            <CardsContainer cards={movies} title="Peliculas" />
          )}
          {series?.length > 0 && (
            <CardsContainer cards={series} title="Series" />
          )}
        </div>
      ) : (
        <div className="register-form">
          <div className="logout-text">
            <h4>Cargando...</h4>
          </div>
        </div>
      )}
      {movies?.length === 0 && series?.length === 0 && (
        <div className="register-form">
          <div className="logout-text">
            <h4>
              Lo sentimos, no tenemos contenido disponible en esta categoria
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentCategory;
