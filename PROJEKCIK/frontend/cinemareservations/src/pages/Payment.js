import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import classes from "./Reservation.module.css"
import axios from "axios";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const reservationData = location.state;

    const mailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const seatWidth = 18;
    const seatHeight = 18;

    let timer;

    useEffect(() => {
        timer = setTimeout(() => {
            alert("Czas rezerwacji miejsc się zakończył, spróbuj ponownie!");
            navigate("/repertuar");
        }, 15 * 60 * 1000)
        return () => clearTimeout(timer)
    }, [])

    const [time, setTime] = useState(900); 

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const body = {
            client_mail: mailRef.current.value,
            seat_id: reservationData.seats.map(s => s.id),
            screening: reservationData.screening.id,
            reservation_date: reservationData.screening.time
        }

        let response;
        let error;

        await axios.put("http://localhost:8080/reservations", body)
            .then(resp => response = resp.data)
            .catch(err => console.error(err));

        if (error){
            return;
        }

        const newData = {
            ...reservationData,
            client: body.client_mail
        }

        if (response) {
            navigate("/summary", {state: newData});
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex flex-row-reverse">
                        <p>Time remaining: {formatTime(time)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h6>Movie: {reservationData.movie.film_name}</h6>
                        <p>Room: {reservationData.screening.room.name}</p>
                        <p>Date: {new Date(reservationData.screening.time).toString().substring(0, 24)}</p>
                        <p>Chosen seats:</p>
                        <ul>
                            <div className="d-flex flex-row flex-wrap">
                                {reservationData.seats.map(seat => {
                                    const backColor = 'blue'
                                    const seatStyle = {
                                        width: seatWidth + 4 + 'px',
                                        height: seatHeight + 4 + 'px',
                                        backgroundColor: backColor,
                                        color: 'white',
                                        borderRadius: `0 0 ${seatWidth / 2}px ${seatWidth / 2}px`,
                                    };
                                    return (
                                        <>
                                            <div className="d-flex flex-row p-1">
                                                <p>{seat.row}</p>
                                                <div className={classes.text} style={seatStyle}>{seat.number}</div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </ul>
                        <p>Price: {reservationData.price.toFixed(2)}zł</p>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-row-reverse">
                            <img src={reservationData.movie.images.poster[1].medium.film_image} />
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input type="email" name="" id="mail" className="form-control" required ref={mailRef} />
                </div>
                <div class="mb-3">
                    <label htmlFor="fname" className="form-label">First name</label>
                    <input type="text" name="" id="fname" className="form-control" required ref={firstNameRef} />
                </div>
                <div class="mb-3">
                    <label htmlFor="lname" className="form-label">Last name</label>
                    <input type="text" name="" id="lname" className="form-control" required ref={lastNameRef} />
                </div>
                <div className="d-flex flex-row-reverse pt-2">
                    <button className="btn btn-secondary">Pay now!</button>
                </div>
            </form>
        </>
    )
}

export default Payment;