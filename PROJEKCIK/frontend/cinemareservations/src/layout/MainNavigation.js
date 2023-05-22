import { Link, useLocation, useNavigate } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import React, { useRef } from 'react'
import { useEffect, useState } from "react"
import axios from 'axios'

function MainNavigation(props) {

  // const logoutUser = async () => {
  //   const resp = await httpClient.post('http://localhost:5002/logout')
  //   window.location.href = "/";
  // }

  // const [isLogged, setIsLogged] = useState(true)

  // // sprawdzenie czy jest zalogowany jeśli tak to wyswietlamy co innego w navbarze
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const resp = await httpClient.get('http://localhost:5002/@me')
  //     } catch (err) {
  //       if (err.response.status === 401) {
  //         setIsLogged(false)
  //       }
  //     }
  //   })();
  // });
  const location = useLocation();
  const navigate = useNavigate();
  const cinemaIdRef = useRef();
  const [cinema, setCinema] = useState("/repertuar");

  function HandleSelect(Event){
    let id = cinemaIdRef.current.value;
    props.changeCinema(id);
    setCinema("/repertuar/" + id);
    if(location.pathname.startsWith("/repertuar")){
        navigate("/repertuar/" + id);
    }

  }

  
    
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>KinoMax</Link></div>
      <nav>
        <ul>
          <li>
            <Link to={cinema}>Repertuar</Link>
          </li>
          <li>
            <Link to="/soon">Zapowiedzi</Link>
          </li>
          <li>
            {props.cinemas && 
              <select className='form-select' onChange={HandleSelect} ref={cinemaIdRef}>
                  {props.cinemas.map(c => {
                    return <option key={c.id} value={c.id}>
                      {c.name + ' - ' + c.city}
                    </option>
                  })}
              </select>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;