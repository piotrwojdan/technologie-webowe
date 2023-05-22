import classes from './Layout.module.css'
import MainNavigation from "./MainNavigation"
import React from 'react';


function Layout(props){

  function HandleSelect(cinemaId){
    props.changeCinema(cinemaId);
  }
  return (<div>
    <MainNavigation cinemas={props.cinemas} changeCinema={HandleSelect}/>
    <main className={classes.main}>{props.children}</main>
  </div>
  );
}

export default Layout;