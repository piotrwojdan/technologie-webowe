import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";
import ScreeningMain from "../components/ScreeningMain";


function Screenings(props) {
    const [screenings, setScreenings] = useState([]);
    const [image, setImage] = useState();
    const [movie, setMovie] = useState();



    useEffect(() => {
        //console.log(props.cinema)
        axios.get('http://localhost:8080/screenings/cinema/' + props.cinema).then(res => {
            const c = res.data;
            //console.log(c);
            const filteredScreenings = c.filter(screening => {
                const screeningDate = new Date(screening.time);
                //console.log(screeningDate);
                const propsDate = new Date(props.date);
                //console.log(propsDate);


                return screeningDate.toDateString() === propsDate.toDateString();
            });

            setScreenings(filteredScreenings);


            //console.log(filteredScreenings);


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
                            <ScreeningMain screening={screening}></ScreeningMain>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginLeft: '250px' }}>Brak dostępnych seansów.</p>
            )}
        </>

    );
}

export default Screenings;