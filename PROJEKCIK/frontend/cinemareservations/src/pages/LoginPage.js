import React, { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin, GoogleLogin, googleLogout } from "@react-oauth/google";


function LoginPage(props) {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState(""); 

    function handleCallbackResponse(response) {
        console.log(response.credential);
        props.setUser(response.credential)
        navigate("/admin");
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "188786724390-1sl15llbffbfkpb80ha1q54jjhppro2j.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("loginbutton"), 
            { theme: "outline", size: "large" }
        );
    }, []);


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
            <div id="loginbutton" style={{ display: "flex", justifyContent: "center" }}>

            </div>
        </div>
    )
}

export default LoginPage;