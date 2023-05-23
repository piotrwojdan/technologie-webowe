import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";

function AddScreening() {
    const location = useLocation();
    const movie = location.state;

    const chosenRoom = useRef();
    const chosenCinema = useRef();
    const [cinema, setCinema] = useState();

    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/cinemas').then(res => {
            const c = res.data;
            console.log(c);
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
            console.log(c);
            setRooms(c);
        }).catch(
            console.log("cos nie tak")
        );
    }, [cinema]);

    function handleSubmit(event) {
        event.preventDefault();

    }

    function handleSelectCinema(event) {
        setCinema(chosenCinema.current.value)
    }

    return (
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
                            <input type="datetime-local" name="" id="time" class="form-control" placeholder="" />

                            <label for="cinema" class="form-label">Wybierz kino:</label>
                            <select className="form-select" onChange={handleSelectCinema} name="cinema" id="cinema" ref={chosenCinema}>
                                <option key={''} value={''}></option>
                                {cinemas && cinemas.map(c => {
                                    return <option key={c.id} value={c.id}>{c.name + ' - ' + c.city}</option>
                                })}
                            </select>

                            <label for="room" class="form-label">Wybierz salę:</label>
                            <select className="form-select" onChange={handleSelectCinema} name="room" id="room" ref={chosenRoom}>
                                <option key={''} value={''}></option>
                                {rooms && rooms.map(c => {
                                    return <option key={c.id} value={c.id}>{c.name}</option>
                                })}
                            </select>
                        </div>

                    </form>

                </div>



            </div>
        </LargeCard>
    );
}

export default AddScreening;