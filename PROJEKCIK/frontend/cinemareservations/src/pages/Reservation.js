import React, { useState, useEffect } from "react";
import RoomView from "../components/RoomView";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Reservation.module.css"
import axios from "axios";

function Reservation(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const screening = location.state;
    const [seatList, setSeatList] = useState([]);
    const [seatTypes, setSeatTypes] = useState([]);
    const [movie, setMovie] = useState();
    const [selectedSeatsReservation, setSelectedSeatsReservation] = useState([]);
    const [price, setPrice] = useState(0.0);

    const seatWidth = 18;
    const seatHeight = 18;

    function setSeatsFromRoomView(seats) {
        // setSelectedSeatsReservation(seats);
        setSelectedSeatsReservation(seats);
        setPrice(calculatePrice(seats))

    }

    function calculatePrice(seats) {
        const prices = seats.map(s => {
            const seat = seatList.find(ss => ss.id === s);
            return seat.seatType.price;
        })
        const sum = prices.reduce((sum, p) => sum + p, 0);
        return sum;
    }

    async function goToPayment() {
        const date_now = new Date();
        date_now.setMinutes(date_now.getMinutes() + 15)
        date_now.setHours(date_now.getHours() + 2)
        const body = {
            client_mail: "payment",
            seat_id: selectedSeatsReservation,
            screening: screening.id,
            reservation_date: date_now.toISOString().substring(0,23)
        }

        let response;

        await axios.put("http://localhost:8080/reservations", body)
            .then(resp => response = resp.data)
            .catch(err => console.error(err));

        if (!response) {
            return
        }

        const seats = response.map(r => r.seat)
        const data = {
            screening: screening,
            seats: seats,
            price: price,
            movie: movie
        }

        navigate("/payment", {state: data})
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8080/seattypes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                resp.push({ id: -1, type: 'TAKEN', price: 0 })
                resp.push({ id: -2, type: 'CHOSEN', price: 0 })
                setSeatTypes(resp);
            })
            .catch((err) => console.log(err))

        fetch("http://127.0.0.1:8080/seats/" + screening.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                setSeatList(resp);
            })
            .catch((err) => console.log(err))

        fetch("https://api-gate2.movieglu.com/filmDetails/?film_id=" + screening.movie_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "api-version": "v200",
                "Authorization": "Basic Tk9ORV8xMTZfWFg6ZHgyY084aG1MdDc0",
                "client": "NONE_116",
                "x-api-key": "luhf2lVbii9PMksiBTA5u2gQuErhXNd889Bu8bxO",
                "device-datetime": "2023-05-112T19:46:30.296Z",
                "territory": "XX",
            },
        }).then((resp) => resp.json())
            .then((resp) => setMovie(resp))
    }, [screening]);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div style={{ height: (150 + seatHeight * screening.room.rowsNumber) + "px" }}>
                            {seatList && <RoomView seats={seatList} screening={screening} setSeatsFromReservation={setSeatsFromRoomView}></RoomView>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="pt-5">
                            {movie && <h6>Film: {movie.film_name}</h6>}
                            <p>Sala: {screening.room.name}</p>
                            <p>Wybrane miejsca:</p>
                            <ul>

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

                            </ul>
                            <p>Cena: {price.toFixed(2)}zł</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="flex-row-reverse">
                            <div className="d-flex flex-row-reverse pt-5">
                                <ul>
                                    {seatTypes && seatTypes.map(s => {
                                        if (s.type !== 'EMPTY') {
                                            let backColor;
                                            if (s.type === 'STANDARD') {
                                                backColor = 'gray';
                                            } else if (s.type === 'PREMIUM') {
                                                backColor = 'green';
                                            } else if (s.type === 'TAKEN') {
                                                backColor = 'red';
                                            } else if (s.type === 'CHOSEN') {
                                                backColor = 'blue';
                                            }

                                            const seatStyle = {
                                                width: seatWidth + 4 + 'px',
                                                height: seatHeight + 4 + 'px',
                                                backgroundColor: backColor,
                                                color: 'white',
                                                borderRadius: `0 0 ${seatWidth / 2}px ${seatWidth / 2}px`,
                                            };
                                            if (s.id > 0) {
                                                return (
                                                    <>
                                                        <div className="d-flex flex-row">
                                                            <div className="p-2">
                                                                <div style={seatStyle}></div>
                                                            </div>
                                                            <div className="p-2">
                                                                <h6>{s.price}</h6>
                                                            </div>
                                                            <div className="p-2">
                                                                <h6>{s.type}</h6>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            } else {
                                                return (
                                                    <>
                                                        <div className="d-flex flex-row">
                                                            <div className="p-2">
                                                                <div style={seatStyle}></div>
                                                            </div>
                                                            <div className="p-2">
                                                                <h6>{s.type}</h6>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        }
                                        return <></>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-row-reverse">
                            <button onClick={goToPayment} className="btn btn-secondary">Buy!</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Reservation;