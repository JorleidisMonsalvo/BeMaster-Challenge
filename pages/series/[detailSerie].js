import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ContentDetails from '../../components/ContentDetails';

const SerieDetails = () => {
  const router = useRouter();
  const { detailSerie } = router.query;
  const [serie, setSerie] = useState(null)

  useEffect(() => {
    
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/tv/${detailSerie}`,
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        language: 'es',
      },
    }).then((response) => {
      setSerie(response.data)
    });
  }, [])
  
  return (<div>
    {serie && <ContentDetails data={serie} type={'serie'}/>}
  </div>
  )
}

export default SerieDetails