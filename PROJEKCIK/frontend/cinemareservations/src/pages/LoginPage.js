import React, { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin, googleLogout } from "@react-oauth/google";


function LoginPage(props) {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");


    const logIn = useGoogleLogin({
        onSuccess: (codeResponse) => {
            props.setUser(codeResponse)
            navigate("/admin");
        },
        onError: (error) => console.log('Login Failed:', error)
    });




    const logInUser = async () => {
        // tu by byla logika logowania gdyby byly zwykle konta
        // natomiast jest ono realizowane poprzez sso dlatego zostanie tu pusto
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
                        required
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
                        required
                    />
                </div>
                <div className="d-flex flex-row-reverse">
                    <button className="btn btn-secondary my-2" type="button" onClick={() => logInUser()}>
                        Log in
                    </button>
                </div>
            </form>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="btn btn-primary px-5 my-2" onClick={() => logIn()}>SSO - Sign in with Google</button>
            </div>
        </div>
    )
}

export default LoginPage;