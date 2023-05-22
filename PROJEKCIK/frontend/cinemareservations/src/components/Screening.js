import React, {useEffect, useState} from "react";
import LargeCard from "../UI/LargeCard";

function Screening(props) {
    const [movie, setMovie] = useState();

    useEffect(() => {
        fetch("https://api-gate2.movieglu.com/filmDetails/?film_id=" + props.movieId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "api-version": "v200",
                "Authorization": "Basic Tk9ORV8xMTZfWFg6ZHgyY084aG1MdDc0",
                "client": "NONE_116",
                "x-api-key": "luhf2lVbii9PMksiBTA5u2gQuErhXNd889Bu8bxO",
                "device-datetime": new Date().toISOString(),
                "territory": "XX",
            },
        }).then((resp) => resp.json())
            .then((resp) => setMovie(resp.data))
            .catch(((error) => console.error(error)))
    }, [])

    return<>
        <LargeCard> {movie && movie.film_name} </LargeCard>
    </>

}

export default Screening;