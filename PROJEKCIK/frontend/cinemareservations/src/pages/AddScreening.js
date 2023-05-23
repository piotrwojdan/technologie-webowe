import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LargeCard from "../UI/LargeCard";
import axios from "axios";

function AddScreening() {
    const location = useLocation();
    const movie = location.state;

    const [cinemas, setCinemas] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/cinemas').then(res => {
          const c = res.data;
          console.log(c);
          setCinemas(c);
        }).catch(
          console.log("cos nie tak")
        );
      }, []);

    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return (
        <LargeCard>
            <div className="row">
                <div className="col-3">
                    <img src={movie.images.poster[1].medium.film_image}></img>
                </div>

                <div className="col-9">
                    <h1>
                        {movie.film_name}
                    </h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div class="container">
                          <label for="time" class="form-label">Wybierz godzinę seansu:</label>
                          <input type="datetime-local" name="" id="time" class="form-control" placeholder="" aria-describedby="helpId"/>
                          
                        </div>
                        
                    </form>
                    
                </div>



            </div>
        </LargeCard>
    );
}

export default AddScreening;