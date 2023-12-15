import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from "firebase/auth";
import {useContext} from "react";
import {LoggedUserContext} from "../../../context/LoggedUserContext";

import { onAuthStateChanged } from "firebase/auth";

export default function LoginButton({icon, buttonText, provider, auth}) {
    const {setLoggedUser} = useContext(LoggedUserContext);

    function signIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google/Facebook Access Token. You can use it to access the Google/Facebook API.

                let credential;
                if(provider instanceof FacebookAuthProvider) {
                    credential = FacebookAuthProvider.credentialFromResult(result);
                } else {
                    credential = GoogleAuthProvider.credentialFromResult(result);
                }
                console.log("credential:");
                console.log(credential);
                const token = credential.accessToken;
                console.log("token:");
                console.log(token);
                console.log("idToken:");
                console.log(credential.idToken);
                // The signed-in user info.
                const user = result.user;
                console.log("user:");
                console.log(user);
                const loggedUser = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    token: token,
                    accessToken: user.accessToken,
                    provider: user.providerData[0].providerId
                }
                console.log(loggedUser);
                setLoggedUser(loggedUser);

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                let credential;
                if(provider instanceof FacebookAuthProvider) {
                    credential = FacebookAuthProvider.credentialFromError(error);
                } else {
                    credential = GoogleAuthProvider.credentialFromError(error);
                }
                console.error(error);
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
    };

    return (
        <>
            <Button className="mainPage_button" variant="outline-primary" size="lg" onClick={signIn}>
                <Stack direction="horizontal" gap={3}>
                    {icon}
                    {buttonText}
                </Stack>
            </Button>
        </>
    );
}