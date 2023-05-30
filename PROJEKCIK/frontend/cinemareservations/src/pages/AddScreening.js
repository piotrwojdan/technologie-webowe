import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";
import classes from "./AddScreening.module.css"

function AddScreening(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state;

    const chosenRoom = useRef();
    const chosenCinema = useRef();
    const chosenDateTime = useRef();

    const [cinema, setCinema] = useState();
    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isError, setError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/cinemas').then(res => {
            const c = res.data;
            setCinemas(c);
        }).catch(
            console.log("cos nie tak")
        );
    }, []);

    useEffect(() => {
        if (cinema == null) {
            return
        }
        axios.get('http://localhost:8080/rooms/cinema/' + cinema).then(res => {
            const c = res.data;
            setRooms(c);
        }).catch(
            console.log("cos nie tak")
        );
    }, [cinema]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(false)

        const screeningData = {
            time: chosenDateTime.current.value,
            movie_id: movie.film_id,
            room_id: chosenRoom.current.value
        }

        let response;
        let error;
        console.log(screeningData)
        console.log(`Bearer ${props.user.access_token}`);

        await axios({
            method: 'POST', 
            url: 'http://localhost:8080/screenings',
            headers: {
                Authorization: `Bearer ${props.user.access_token}`,
                'Content-Type': 'application/json',
            },
            data: screeningData,
        })
            .then(resp => response = resp.data)
            .catch(err => error = err);

        if (error) {
            setError(true);
            return
        }

        if (response) {
            navigate("/admin")
        }
    }

    function handleSelectCinema(event) {
        setError(false)
        setCinema(chosenCinema.current.value)
    }

    function handleSelectRoom(event) {
        setError(false)
    }

    return (
        <>
            <LargeCard>
                <div className="row">
                    <div className="col-3">
                        <img src={movie.images.poster[1].medium.film_image}></img>
                    </div>

                    <div className="col-9">
                        <h1>
                            {movie.film_name}
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <div class="container">
                                <label for="time" class="form-label">Wybierz godzinę seansu:</label>
                                <input type="datetime-local" name="" id="time" class="form-control" placeholder="" ref={chosenDateTime} required onChange={handleSelectRoom} />

                                <label for="cinema" class="form-label">Wybierz kino:</label>
                                <select className="form-select" onChange={handleSelectCinema} name="cinema" id="cinema" ref={chosenCinema} required>
                                    <option key={''} value={''}></option>
                                    {cinemas && cinemas.map(c => {
                                        return <option key={c.id} value={c.id}>{c.name + ' - ' + c.city}</option>
                                    })}
                                </select>

                                <label for="room" class="form-label">Wybierz salę:</label>
                                <select className="form-select" onChange={handleSelectRoom} name="room" id="room" ref={chosenRoom} required>
                                    <option key={''} value={''}></option>
                                    {rooms && rooms.map(c => {
                                        return <option key={c.id} value={c.id}>{c.name}</option>
                                    })}
                                </select>
                                <div className="d-flex flex-row-reverse">
                                    <button className="btn btn-secondary my-3">Dodaj</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </LargeCard>
            <div className="">
                {isError === true ?
                    <span className={classes.error}>There was an error!</span>
                    :
                    <></>}
            </div>
        </>
    );
}

export default AddScreening;