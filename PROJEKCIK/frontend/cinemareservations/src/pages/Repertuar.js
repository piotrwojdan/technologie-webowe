import React from "react";
import { useEffect, useState} from "react"
import {useParams} from "react-router-dom"
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
        setScreenings(c);
      }).catch(
        console.log("cos nie tak")
      );
    }, [])
    return (
        <>
            {screenings && screenings.map(s => {
                return <Screening movieId={s.movie_id}></Screening>
            })}
        </>
    );
}

export default Repertuar;