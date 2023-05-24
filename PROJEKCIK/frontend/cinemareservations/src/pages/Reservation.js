import React, { useState, useEffect } from "react";
import RoomView from "../components/RoomView";
import { useLocation } from "react-router-dom";

function Reservation(props) {
    const location = useLocation();
    const screening = location.state;
    const [seatList, setSeatList] = useState();
    const [seatTypes, setSeatTypes] = useState();

    const seatWidth = 20;
    const seatHeight = 20;

    useEffect(() => {
        fetch("http://127.0.0.1:8080/seats/" + screening.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                const s = resp.map(t => t.seatType.id).filter((val, idx, arr) => arr.indexOf(val) === idx)
                const ss = s.map(t => {
                    return resp.map(temp => temp.seatType).filter(val => val.id === t)
                })
                const sss = ss.map(arr => { return arr[0] })
                sss.push({ id: -1, type: 'TAKEN', price: 0 })
                sss.push({ id: -2, type: 'CHOSEN', price: 0 })
                setSeatTypes(sss);
                setSeatList(resp)
            })
            .catch((err) => console.log(err))

        // fetch("https://api-gate2.movieglu.com/filmsNowShowing/?n=10", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "api-version": "v200",
        //         "Authorization": "Basic Tk9ORV8xMTZfWFg6ZHgyY084aG1MdDc0",
        //         "client": "NONE_116",
        //         "x-api-key": "luhf2lVbii9PMksiBTA5u2gQuErhXNd889Bu8bxO",
        //         "device-datetime": "2023-05-112T19:46:30.296Z",
        //         "territory": "XX",
        //     },
        // }).then((resp) => resp.json())
        //     .then((resp) => console.log(resp))
    }, [screening]);


    return (
        <>
            {seatList && <RoomView seats={seatList}></RoomView>}
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
                                            <div className="col-12">
                                                <h6>{s.type}</h6>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row">
                                                <div className="p-2">
                                                    <div style={seatStyle}></div>
                                                </div>
                                                <div className="p-2">
                                                    <h6>{s.price}</h6>
                                                </div>
                                        </div>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <div className="d-flex flex-row">
                                            <div className="p-2">
                                                <h6>{s.type}</h6>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row">
                                                <div className="p-2">
                                                    <div style={seatStyle}></div>
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
        </>
    );
}

export default Reservation;