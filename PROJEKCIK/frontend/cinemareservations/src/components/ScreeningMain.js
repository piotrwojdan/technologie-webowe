import React, { useEffect, useState } from "react";
import LargeCard from "../UI/LargeCard";
import classes from './Screening.module.css'
import Reservation from "../pages/Reservation";
import { useNavigate } from "react-router-dom"


function ScreeningMain(props) {
    const [movie, setMovie] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate()



    useEffect(() => {
        console.log(props.screening.movie_id)
        fetch("https://api-gate2.movieglu.com/filmDetails/?film_id=" + props.screening.movie_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "api-version": "v200",
                "Authorization": "Basic Tk9ORV8xMTZfWFg6ZHgyY084aG1MdDc0",
                "client": "NONE_116",
                "x-api-key": "luhf2lVbii9PMksiBTA5u2gQuErhXNd889Bu8bxO",
                "device-datetime": new Date().toISOString(),
                "territory": "XX",
            },
        }).then((resp) => resp.json())
            .then((resp) => {
                setMovie(resp)
                setImage(resp.images.poster[1].medium.film_image)
            })
            .catch(((error) => console.error(error)))


    }, [props.screening])

    const Description = ({ fullText }) => {
        const [showFullText, setShowFullText] = useState(false);


        const toggleText = () => {
            setShowFullText(!showFullText);
        };
        return (
            <div>
                {showFullText ? (
                    <p>{fullText}</p>
                ) : (
                    <p>{fullText.slice(0, 200)}...</p>
                )}<div style={{ float: 'right' }}>
                    <button style={{ textAlign: 'right' }} className="btn" onClick={toggleText}>
                        {showFullText ? 'Czytaj mniej' : 'Czytaj więcej'}
                    </button>
                </div>
            </div>
        );
    }


    const SessionTime = ({ time, s }) => {
        const extractedTime = new Date(time);
        const currentTime = new Date();

        const handleButtonClick = (screening) => {
            navigate("/", { state: screening })
        };
        const isButtonDisabled = extractedTime < currentTime;

        return (

            <div className={classes.myButton}>

                <button type="button" className="btn btn-outline-secondary" onClick={() => handleButtonClick(s)} disabled={isButtonDisabled}>{extractedTime.getHours()}:{extractedTime.getMinutes()}</button>

            </div>
        );
    };
    return <>
        {image &&


            <LargeCard>
                <div className="row">
                    <div className="col-3">
                        <img src={image}></img>
                    </div>

                    <div className="col-9">
                        <h1>
                            {movie.film_name}
                        </h1>
                        <p> {movie.duration_mins} min</p>
                        <Description fullText={movie.synopsis_long}></Description>
                        <div className={classes.container}>
                            
                                 <SessionTime s={props.screening} time={props.screening.time}></SessionTime>
                            
                        </div>
                    </div>
                </div>


            </LargeCard>
        }
    </>

}
export default ScreeningMain;