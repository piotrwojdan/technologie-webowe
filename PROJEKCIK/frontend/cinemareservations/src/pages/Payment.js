import React, { useRef } from "react";
import { useLocation } from "react-router";
import classes from "./Reservation.module.css"
import axios from "axios";

function Payment() {
    const location = useLocation();
    const reservationData = location.state;

    const mailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const seatWidth = 18;
    const seatHeight = 18;

    async function handleSubmit(event) {
        event.preventDefault();

        const body = {
            client_mail: mailRef.current.value,
            seat_id: reservationData.seats.map(s => s.id),
            screening: reservationData.screening.id,
            reservation_date: reservationData.screening.time
        }

        let response;

        await axios.put("http://localhost:8080/reservations", body)
            .then(resp => response = resp.data)
            .catch(err => console.error(err));

    }


    return (
        <>
            <div className="container-fluis">
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