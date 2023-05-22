import { Link } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios'

function MainNavigation() {

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

    const [cinemas, setCinemas] = useState();

    useEffect(() => {
      axios.get('http://localhost:8080/cinemas').then(res => {
        const c = res.data;
        console.log(c);
        setCinemas(c);
      }).catch(
        console.log("cos nie tak")
      );
    }, [])

  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>KinoMax</Link></div>
      <nav>
        <ul>
          <li>
            <Link to='/repertuar'>Repertuar</Link>
          </li>
          <li>
            <Link to="/soon">Zapowiedzi</Link>
          </li>
          <li>
            {cinemas && 
              <ul>
                  {cinemas.map(c => {
                    <li key={c.id} style="color: black">
                      {c.name + ' - ' + c.city}
                    </li>
                  })}
              </ul>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;