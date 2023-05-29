import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";
import Screening from "../components/Screening";


function Screenings(props) {
    const [screenings, setScreenings] = useState([]);
    const [image, setImage] = useState();
    const [movie, setMovie] = useState();



    useEffect(() => {
        //console.log(props.cinema)
        axios.get('http://localhost:8080/screenings/cinema/' + props.cinema).then(res => {
            const c = res.data;
            //console.log(c);
            const filteredScreenings = c.reduce((filtered, screening) => {
                const screeningDate = new Date(screening.time);
                const propsDate = new Date(props.date);

                if (screeningDate.toDateString() === propsDate.toDateString()) {
                    filtered.push(screening);
                }

                return filtered;
            }, []);

            const movies = filteredScreenings.map(t => t.movie_id).filter((val, idx, arr) => arr.indexOf(val) === idx);

            const actualScreenings = movies.map(movie => {
                return filteredScreenings.filter(t => t.movie_id === movie);
            });

            setScreenings(actualScreenings);




        }).catch(
            console.log("cos nie tak")
        );
    }, [props.cinema, props.date])




    

    return (
        <>
            {screenings && screenings.length > 0 ? (
                <ul>
                    {screenings.map(screening => (
                        <li key={screening.id}>
                            <Screening screening={screening}></Screening>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ display: "flex", justifyContent: "center"}}>Brak dostępnych seansów.</p>
            )}
        </>

    );
}

export default Screenings;