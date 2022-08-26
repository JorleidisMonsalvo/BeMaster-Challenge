import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import ContentDetails from "../../components/ContentDetails";

const MovieDetails = () => {
  const router = useRouter();
  const { detailMovie } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${detailMovie}`,
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        language: "es",
      },
    }).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return <div>{movie && <ContentDetails data={movie} type="movie" />}</div>;
};

export default MovieDetails;
