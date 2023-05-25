import React, { useState, useEffect, useRef } from "react";
import Reservation from "./Reservation";
import { Carousel } from 'react-bootstrap';
import classes from './MainPage.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Repertuar from "./Repertuar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";




function MainPage() {
    const [movies, setMovies] = useState([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);


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
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp.films);
                setMovies(resp.films);
            })
            .catch((error) => console.error(error));
    }, []);

    

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleMouseEnter = (movie) => {
        setHoveredMovie(movie);
    };

    const handleMouseLeave = () => {
        setHoveredMovie(null);

    };

    const filteredMovies = movies.filter((movie) => {
        const movieDate = new Date(movie.releaseDate);
        return (
            selectedDate &&
            movieDate.toDateString() === selectedDate.toDateString()
        );
    });

    const renderMovieSlides = () => {
        const slides = [];
        const moviesCount = movies.length;
        const slideSize = 5;

        for (let i = 0; i < moviesCount; i += slideSize) {
            const slideMovies = movies.slice(i, i + slideSize);

            const slide = (
                <Carousel.Item key={i}>
                    <div className={classes.rowContainer}>
                        {slideMovies.map((movie) => (
                            <div className={classes.movieContainer} key={movie.film_id}>
                                <div className={classes.slide}
                                    onMouseEnter={() => handleMouseEnter(movie)}
                                    onMouseLeave={handleMouseLeave}>
                                    <img
                                        className={classes.item}
                                        src={movie.images.poster[1].medium.film_image}
                                        alt={movie.film_name}
                                    />
                                    <div >
                                        {hoveredMovie === movie && (
                                            <div className={classes.description}>


                                                <p>{movie.release_dates[0].release_date}</p>
                                            </div>
                                        )}
                                        <h3 className={classes.title}>{movie.film_name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            );

            slides.push(slide);
        }

        return slides;
    };

    

    return (
        <div>
            <h2 className={classes.naglowek}>Nadchodzące filmy</h2>
            <div className={classes.container}>
                <Carousel className={classes.custom}>
                    {renderMovieSlides()}
                </Carousel>
            </div>
            <h2 className={classes.naglowek}>Aktualny Repertuar</h2>
            <div className={classes.datepicker}>
            <DatePicker 
                className={classes.datepickerInput}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Wybierz datę"
            />
            </div>
        </div>
    );
}


export default MainPage;