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
    
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'><h1>KinoMax</h1></Link></div>
      <nav>
        <ul>
          <li>
            <Link to="/repertuar">Repertuar</Link>
          </li>
          <li>
            <Link to="/soon">Zapowiedzi</Link>
          </li>
          <li>
            <Link to="login">Zaloguj się</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;