import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from 'next/link'

const ContentDetails = ({
  data: { vote_average, vote_count, backdrop_path, spoken_languages, overview, homepage },
  type,
  data
}) => {
  const [specific, setSpecific] = useState({});
  let dollarUSLocale = Intl.NumberFormat('en-US');
  
  useEffect(() => {
    if(type=== 'serie'){
      setSpecific({
        value1: data.name,
        value2: 'Fecha primer episodio: ' + data.first_air_date,
        value3: 'Fecha próximo episodio: ' + data.next_episode_to_air.air_date,
        value4: 'Episodios: ' + data.number_of_episodes+ '. Temporadas: ' + data.number_of_seasons,
      })
    } else {
      setSpecific({
        value1: data.title,
        value2: 'Fecha de lanzamiento: ' + data.release_date,
        value3: 'Presupuesto: $' + dollarUSLocale.format(data.budget),
        value4: 'Revenue: $' + dollarUSLocale.format(data.revenue)
      })
    }
  }, [])
  
    return (
      <div className="content-big-container">
        <div className="content-details-container">
          <h1>{specific.value1}.</h1>
          <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} />
          <div className="content-desc">
            <span>
              Puntuación: <FaStar style={{ color: "yellow" }} /> {vote_average}{" "}
              ({vote_count} votos).
            </span>
            <span>Lenguaje: {spoken_languages[0].english_name}, {spoken_languages[0].name}.</span>
            <span>
              {specific.value4}
            </span>
            <span>
              {specific.value2}. - {specific.value3}
            </span>
            <p>{overview}</p>
            {
              homepage!='' &&
              <Link href={homepage} ><a target='_blank'>Más información.</a></Link>
            }
          </div>
        </div>
      </div>
    );
};

export default ContentDetails;
