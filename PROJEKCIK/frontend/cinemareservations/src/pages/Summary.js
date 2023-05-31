import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Reservation.module.css"
import axios from "axios";
import { PDFDownloadLink, Document, Text, Page, View, Image } from '@react-pdf/renderer';

function Summary() {
    const location = useLocation();
    const reservationData = location.state;
    const seatWidth = 18;
    const seatHeight = 18;

    const file_name = 'potwierdzenie_rezerwacji_' + new Date().toISOString() + '.pdf'
    const [cinema, setCinema] = useState([]);

    const MyDocument = () => (
        <Document>
          <Page>
            <Text>Movie: {reservationData.movie.film_name}</Text>
            <Text>Cinema: {cinema && cinema.name + ' - ' + cinema.city}</Text>
            <Text>Room: {reservationData.screening.room.name}</Text>
            <Text>Date: {new Date(reservationData.screening.time).toString().substring(0, 24)}</Text>
            <Text>Chosen seats:</Text>
            <View>
              {reservationData.seats.map((seat, index) => (
                <Text key={index}>{seat.row + ' - ' + seat.number}</Text>
              ))}
            </View>
            <Text> </Text>
            <Text>Price: {reservationData.price.toFixed(2)}zl</Text>
            <Text>Client data: {reservationData.client}</Text>
            
          </Page>
        </Document>
      );

    useEffect(() => {
        axios.get('http://localhost:8080/cinemas/' + reservationData.screening.room.idCinema).then(res => {
            const c = res.data;
            setCinema(c);
        }).catch(
            console.log("cos nie tak")
        );
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h6>Movie: {reservationData.movie.film_name}</h6>
                        <p>Cinema: {cinema && cinema.name + ' - ' + cinema.city}</p>
                        <p>Room: {reservationData.screening.room.name}</p>
                        <p>Date: {new Date(reservationData.screening.time).toString().substring(0, 24)}</p>
                        <p>Client: {reservationData.client}</p>
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

                <PDFDownloadLink document={<MyDocument />} fileName={file_name}>
                    {({ blob, url, loading, error }) => (loading ? 'Generowanie PDF...' : 'Pobierz potwierdzenie')}
                </PDFDownloadLink>
            </div>
        </>
    )
}

export default Summary;