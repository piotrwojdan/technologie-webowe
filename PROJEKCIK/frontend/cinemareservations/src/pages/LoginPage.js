import React, { useState, useEffect } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function LoginPage() {

    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");

    const navigate = useNavigate();

    const logInUser = async () => {
        // tu logowanie z backa trzeba zrobic plus to sso 
        navigate("/admin");
    };

    return (
        <div className="container">
            <h3>Zaloguj się do konta</h3>
            <form>
                <div className="form-group py-2">
                    <label htmlFor="login">Login: </label>
                    <input
                        className="form-control"
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        id="login"
                    />
                </div>
                <div className="form-group py-2">
                    <label htmlFor="password">Hasło: </label>
                    <input
                        className="form-control"
                        type="password"
                        value={haslo}
                        onChange={(e) => setHaslo(e.target.value)}
                        id="password"
                    />
                </div>
                <button className="btn btn-primary my-2" type="button" onClick={() => logInUser()}>
                    Zaloguj
                </button>
            </form>
        </div>
    )
}

export default LoginPage;