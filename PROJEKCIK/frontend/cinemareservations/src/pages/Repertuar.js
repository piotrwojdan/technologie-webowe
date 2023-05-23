import React, { useRef } from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Screening from "../components/Screening";

function Repertuar() {
  const [screenings, setScreenings] = useState([]);

  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState(0);

  const cinemaIdRef = useRef();

  function HandleSelect() {
    setCinema(cinemaIdRef.current.value);
  }


  useEffect(() => {
    axios.get('http://localhost:8080/cinemas').then(res => {
      const c = res.data;
      console.log(c);
      setCinemas(c);
      setCinema(c[0].id)
    }).catch(
      console.log("cos nie tak")
    );
  }, [])



  useEffect(() => {
    axios.get('http://localhost:8080/screenings/cinema/' + cinema).then(res => {
      const c = res.data;
      console.log(c);

      const movies = c.map(t => t.movie_id).filter((val, idx, arr) => arr.indexOf(val) === idx)
      console.log(movies)
      const actualScreenings = movies.map(movie => {
        return c.filter(t => t.movie_id === movie)
      })
      console.log(actualScreenings)
      setScreenings(actualScreenings);


    }).catch(
      console.log("cos nie tak")
    );
  }, [cinema])


  return (
    <>
      {cinemas &&
        <select className='form-select' onChange={HandleSelect} ref={cinemaIdRef}>
          {cinemas.map(c => {
            return <option key={c.id} value={c.id}>
              {c.name + ' - ' + c.city}
            </option>
          })}
        </select>
      }
      <ul>
        {screenings && screenings.map((s) => {
          return <li key={s.id}><Screening screening={s}></Screening></li>
        })}
      </ul>
    </>
  );
}

export default Repertuar;