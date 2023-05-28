import React, { useState, useEffect } from "react";
import RoomView from "../components/RoomView";
import { useLocation } from "react-router-dom";

function Reservation(props) {
    const location = useLocation();
    const screening = location.state;
    const [seatList, setSeatList] = useState([]);
    const [seatTypes, setSeatTypes] = useState([]);
    const [movie, setMovie] = useState();
    const [selectedSeatsReservation, setSelectedSeatsReservation] = useState([]);

    const seatWidth = 18;
    const seatHeight = 18;

    function setSeatsFromRoomView(seats) {
        setSelectedSeatsReservation(seats);
        console.log(selectedSeatsReservation);
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
                            {selectedSeatsReservation && selectedSeatsReservation.map(s => {
                                const seat = seatList.filter(ss => ss.id = s)[0]
                                console.log(seat)
                                return (<>
                                    <p>{seat.row}</p>
                                    <p>{seat.number}</p>
                                </>
                                )
                            })}
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
                </div>

            </div>
        </>
    );
}

export default Reservation;