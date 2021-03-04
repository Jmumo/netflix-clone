import React,{useState,useEffect} from 'react'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
import axios from './axios'
import './Row.css'

const baseURL = 'https://image.tmdb.org/t/p/original/';

function Row({title,fetchUrl,isLargeRow}) {

    const [movies,setMovies] = useState([])
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(() => {
         async function fetchData(){
      const request = await axios.get(fetchUrl)
     
      setMovies(request.data.results)
     
      return request
         }
         fetchData();
    }, [fetchUrl])
      const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const handleclick = (movie)=>{
       
      if(trailerUrl){
          setTrailerUrl('');
      }else{
          movieTrailer(movie?.name || "",{multi:false})
          .then(url=>{

            const urlParams = new URLSearchParams(new URL(url).search)

            setTrailerUrl(urlParams.get('v'));

          }).catch(error =>console.log(error))
      }
    }

    return (
        <div className="row">
            {title}
            <div className={`row_posters `}>
                 {movies.map(movie=>(

               <img key= {movie.id}
               onClick={()=>handleclick(movie)}
               className={`row_poster ${isLargeRow && "row_posterLarge" }`} src= {`${baseURL}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} alt={ movie.name}/>
                ))}
            </div>
            { trailerUrl && <YouTube videoId={trailerUrl}  opts={ opts}  />}
        </div>

    )
}

export default Row