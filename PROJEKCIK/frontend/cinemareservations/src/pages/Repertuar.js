import React, { useRef } from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Screenings from "../pages/Screenings";
import classes from './MainPage.module.css';

function Repertuar() {
  const [screenings, setScreenings] = useState([]);

  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(0);


  const cinemaIdRef = useRef();
  const chosenDate = useRef();
  const [isLoading, setIsLoading] = useState(false);



  function HandleSelect() {
    setCinema(cinemaIdRef.current.value);
  }

  const handleClick = () => {
    if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        setDate(formattedDate);
    }


};

const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelectedDate(selectedDate);
};


  useEffect(() => {
    axios.get('http://localhost:8080/cinemas').then(res => {
      const c = res.data;
      setCinemas(c);
      setCinema(c[0].id)
    }).catch(
      console.log("cos nie tak")
    );
  }, [])



  useEffect(() => {
    axios.get('http://localhost:8080/screenings/cinema/' + cinema).then(res => {
      const c = res.data;

      const movies = c.map(t => t.movie_id).filter((val, idx, arr) => arr.indexOf(val) === idx)

      const actualScreenings = movies.map(movie => {
        return c.filter(t => t.movie_id === movie)
      })

      setScreenings(actualScreenings);


    }).catch(
      console.log("cos nie tak")
    );
  }, [cinema])


  return (
    <>
      <div className={classes.picker}>
        <label for="time" class="form-label" className={classes.text}>Wybierz kino:</label>
        {cinemas &&
          <select className='form-select' style={{ marginRight: '20px', width: '350px' }} onChange={HandleSelect} ref={cinemaIdRef}>
            {cinemas.map(c => {
              return <option key={c.id} value={c.id}>
                {c.name + ' - ' + c.city}
              </option>
            })}
          </select>
        }

        <label for="time" class="form-label" className={classes.text}>Wybierz datę:</label>
        <input type="date" style={{ marginRight: '40px', width: '200px' }} name="" id="time" class="form-control" placeholder="" ref={chosenDate} value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={handleDateChange} />        
          <button className="btn btn-btn btn-secondary" style={{ marginRight: '40px', width: '100px' }} onClick={handleClick}>Szukaj</button>

      </div >
      <ul>
          <Screenings cinema={cinema} date={date} />
        
      </ul>
    </>
  );
}

export default Repertuar;