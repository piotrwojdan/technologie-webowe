import React, { useEffect, useState } from "react";
import axios from 'axios'

const axio = axios.create({ withCredentials: true });

function Cinemas() {

    const [cinemas, setCinemas] = useState();

    useEffect(() => {
        fetch("http://127.0.0.1:8080/cinemas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => setCinemas(resp))
            .catch((err) => console.log(err))

        fetch("https://api-gate2.movieglu.com/filmsNowShowing/?n=10", {
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
            .then((resp) => console.log(resp))
    }, [])

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {cinemas && cinemas.map(cinema => {
                        return (
                            <tr>
                                <td>{cinema.id}</td>
                                <td>{cinema.name}</td>
                                <td>{cinema.city}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Cinemas;