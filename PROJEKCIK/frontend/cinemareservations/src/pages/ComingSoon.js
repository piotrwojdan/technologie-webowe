import React, { useState, useEffect } from "react";
import LargeCard from "../UI/LargeCard";
import {useNavigate} from "react-router-dom"

function ComingSoon() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://api-gate2.movieglu.com/filmsNowShowing/?n=" + 10, {
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
            .then((resp) => {
                setMovies(resp.films)
            })
            .catch(((error) => console.error(error)))
    }, [])

    

    return (
        <>
            <ul>
                {movies && movies.map(m => {
                    return (
                        <li>
                            <LargeCard>
                                <div className="row">
                                    <div className="col-3">
                                        <img src={m.images.poster[1] ? m.images.poster[1].medium.film_image : ''}></img>
                                    </div>

                                    <div className="col-9">
                                        <h1>
                                            {m.film_name}
                                        </h1>
                                        <p>
                                            {m.synopsis_long}
                                        </p>
                                    </div>

                                    

                                </div>
                            </LargeCard>
                        </li>
                    )
                })}
            </ul>
        </>
    );

}

export default ComingSoon;