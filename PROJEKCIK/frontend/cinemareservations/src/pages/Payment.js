import React, { useRef } from "react";
import { useLocation } from "react-router";
import classes from "./Reservation.module.css"

function Payment() {
    const location = useLocation();
    const reservationData = location.state;

    const mailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();



    function handleSubmit(event) {
        event.preventDefault();



    }


    return (
        <>
            <h6>Film: {reservationData.movie.film_name}</h6>
            <p>Sala: {reservationData.screening.room.name}</p>
            <p>Wybrane miejsca:</p>
            {/* <ul>
                <div className="d-flex flex-row flex-wrap">
                    {selectedSeatsReservation && selectedSeatsReservation.map(s => {

                        const seat = seatList.find(ss => ss.id === s)
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
            </ul> */}
            <p>Cena: {reservationData.price.toFixed(2)}zł</p>
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