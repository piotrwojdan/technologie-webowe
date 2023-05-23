import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Screening from "../components/Screening";

function Repertuar() {
  const [screenings, setScreenings] = useState([]);
  const { id } = useParams();



  useEffect(() => {
    console.log(id);
    axios.get('http://localhost:8080/screenings/cinema/' + id).then(res => {
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
  }, [])


  return (
    <><ul>
      {screenings && screenings.map((s) => {


        return <li key={s.id}><Screening screening={s}></Screening></li>
      })}
    </ul>
    </>
  );
}

export default Repertuar;