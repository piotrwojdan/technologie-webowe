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