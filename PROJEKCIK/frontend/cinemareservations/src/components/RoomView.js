import React, {useState} from "react";
import classes from './RoomView.module.css'

function RoomView(props) {

    const seatWidth = 20;
    const seatHeight = 20;
    const spaceWidth = 10;
    const spaceHeight = 12;
    const screenSize = 200;

    const screenStyle = {
        width: screenSize * 2 + 'px',
        height: '7px'
    };

    const rowsNumber = props.screening.room.rowsNumber;
    const rowsList = Array.apply(null, { length: rowsNumber }).map((_, idx) => { return idx; });

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        if (props.seats.find(seat => seat.id == seatId).seatType.type === 'EMPTY'){
            
            return 
        }

        // Sprawdź, czy miejsce jest już wybrane
        const isSeatSelected = selectedSeats.includes(seatId);
        

        if (isSeatSelected) {
            // Jeśli miejsce jest już wybrane, usuń je z listy wybranych miejsc
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
        } else {
            // Jeśli miejsce nie jest wybrane, dodaj je do listy wybranych miejsc
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };


    return (
        <div style={{ position: 'relative' }}>

            <div className={classes.screen} style={screenStyle}></div>

            {props.seats.map((seat, index) => {
                const xPos = (seat.number - 1) * (seatWidth + spaceWidth) - 50;
                const yPos = (seat.row - 1) * (seatHeight + spaceHeight) + 75;
                let backColor;
                if (seat.seatType.type === 'EMPTY') {
                    backColor = 'white';
                } else if (seat.seatType.type === 'STANDARD') {
                    backColor = 'gray';
                } else if (seat.seatType.type === 'PREMIUM') {
                    backColor = 'green';
                }

                if (seat.isTaken && seat.seatType.type !== 'EMPTY') {
                    backColor = 'red';
                }

                const seatStyle = {
                    position: 'absolute',
                    top: yPos + 'px',
                    left: xPos + 'px',
                    width: seatWidth + 4 + 'px',
                    height: seatHeight + 4 + 'px',
                    backgroundColor: selectedSeats.includes(seat.id) ? 'blue' : backColor,
                    color: 'white',
                    borderRadius: `0 0 ${seatWidth / 2}px ${seatWidth / 2}px`,
                };
                
                return <div className={classes.text} key={index} style={seatStyle} onClick={() => handleSeatClick(seat.id)}>{seat.seatType.type !== 'EMPTY' && seat.number}</div>;
            })}

            {rowsList.map(row => {
                const yPos = row * (seatHeight + spaceHeight) + 75;

                const rowStyle = {
                    position: 'absolute',
                    top: yPos + 'px',
                    left: '-100px',
                    height: seatHeight + 4 + 'px',
                    fontSize: '18px'
                }

                return <div className={classes.text} key={row} style={rowStyle}>{row + 1}</div>
            })}
        </div>
    );

}

export default RoomView;