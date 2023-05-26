import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";
import Screening from "../components/Screening";


function Screenings(props) {
    const [screenings, setScreenings] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/screenings/cinema/' + props.cinema).then(res => {
            const c = res.data;

            const filteredScreenings = c.filter(screening => {
                const screeningDate = new Date(screening.date); // Konwertujemy datę seansu na obiekt Date
                const selectedDate = new Date(props.date); // Konwertujemy przekazaną datę na obiekt Date

                // Porównujemy tylko datę seansu (ignorujemy czas)
                return screeningDate.toDateString() === selectedDate.toDateString();
            });

            setScreenings(filteredScreenings);
            // console.log(screenings);


        }).catch(
            console.log("cos nie tak")
        );
    }, [props.cinema, props.date])



    return (
        <><ul>
            {screenings && screenings.map((s) => {
                return <li key={s.id}><Screening screening={s}></Screening></li>
            })}
        </ul></>
    );
}

export default Screenings;