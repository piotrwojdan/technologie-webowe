import { Link, useLocation, useNavigate } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import React, { useRef } from 'react'
import { useEffect, useState } from "react"
import axios from 'axios'
import { googleLogout } from '@react-oauth/google'

function MainNavigation(props) {

  const logoutUser = async () => {
    googleLogout();
    props.setUser(undefined);
    window.location.href = "/";
  }

  console.log({user: props.user})

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
            {props.user &&
              <button className='btn mb-2' style={{ color: "white", padding: "0" }} onClick={logoutUser}>Log out</button>
            }
            {!props.user &&
              <Link to="login">Log in</Link>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;