import React, { useState, useEffect, useRef } from "react";
import { Carousel } from 'react-bootstrap';
import classes from './MainPage.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Screenings from "./Screenings";
import axios from "axios";




function MainPage() {
    const [movies, setMovies] = useState([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [cinemas, setCinemas] = useState([]);
    const [cinema, setCinema] = useState(0);
    const chosenDate = useRef();
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const cinemaIdRef = useRef();

    function HandleSelect(event) {
        const selectedCinemaId = event.target.value;

        const longValue = parseInt(selectedCinemaId, 10);
        console.log(selectedCinemaId);
        console.log(typeof longValue)
        setCinema(longValue);
    }

    const handleClick = (event) => {
        setIsLoading(true);
        // console.log(chosenDate.current.value);
        // console.log(typeof chosenDate);
        // const selectedCinemaId = event.target.value;
        // const longValue = parseInt(selectedCinemaId, 10);
        // console.log(selectedCinemaId);
        // console.log(typeof selectedCinemaId);
        // console.log(chosenDate.current.value);
        // console.log(cinema);
        


    };

    useEffect(() => {
        axios.get('http://localhost:8080/cinemas').then(res => {
            const c = res.data;
            setCinemas(c);
            setCinema(c[0].id)
        }).catch(
            console.log("cos nie tak")
        );
    }, [])


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
                                        src={movie.images.poster[1] ? movie.images.poster[1].medium.film_image : ''}
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
                {movies && <Carousel className={classes.custom}>
                    {renderMovieSlides()}
                </Carousel>}
            </div>
            <h2 className={classes.naglowek}>Aktualny repertuar</h2>
            <div className={classes.picker}>
                <label for="time" class="form-label" style={{ marginRight: '40px', width: '100px' }}>Wybierz kino:</label>
                {cinemas &&
                    <select className='form-select' style={{ marginRight: '20px', width: '350px' }} onChange={HandleSelect} ref={cinemaIdRef}>
                        {cinemas.map(c => {
                            return <option key={c.id} value={c.id}>
                                {c.name + ' - ' + c.city}
                            </option>
                        })}
                    </select>
                }

                <label for="time" class="form-label" style={{ marginRight: '40px', width: '100px' }}>Wybierz datę:</label>
                <input type="date" style={{ marginRight: '40px', width: '200px' }} name="" id="time" class="form-control" placeholder="" ref={chosenDate} required />
                <button className="btn btn-btn btn-secondary" style={{ marginRight: '40px', width: '100px' }} onClick={handleClick}>Szukaj</button>

            </div>
            <div className={classes.screening}>
                {isLoading === true && <Screenings cinema={cinema} date={chosenDate.current.value}/>}
            </div>
        </div>
    );
}


export default MainPage;