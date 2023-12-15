import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {LoggedUserContext} from "../context/LoggedUserContext";

import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function UnauthenticatedRoute() {
    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);
    isUserSignedIn();
    function isUserSignedIn() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const loggedUser = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    token: "token",
                    accessToken: user.accessToken,
                    provider: user.providerData[0].providerId
                }
                setLoggedUser(loggedUser);
            } else {
                // User is signed out
            }
        });
    }

    return (
        <>
            {(loggedUser != null) && <Navigate to="/" replace={true} />}
            {(loggedUser == null) && <Outlet />}

            {/*{ isUserSignedIn() && <Navigate to="/" replace={true} />}
            { !isUserSignedIn() && <Outlet />}*/}
        </>
    );
}
