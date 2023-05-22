import React, { useState, useEffect } from "react";
import RoomView from "../components/RoomView";

function Reservation(props) {

    const [seatList, setSeatList] = useState();

    useEffect(() => {
        fetch("http://127.0.0.1:8080/seats/" + props.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => { console.log(resp)
                setSeatList(resp)})
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
    }, []);


    return (
        <>
            {seatList && <RoomView seats={seatList}></RoomView>}
        </>
    );
}

export default Reservation;