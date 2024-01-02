import {FacebookAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import BootstrapIcons from "../../../utils/BootstrapIcons";
import LoginButton from "./LoginButton";
import * as strings from "../../../strings/strings.js";

export default function LoginFacebookButton() {
    const facebookAuthProvider = new FacebookAuthProvider();
    const auth = getAuth();

    /*
    function signInWithFacebook() {
        const facebookAuthProvider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, facebookAuthProvider)
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                console.log("credential:");
                console.log(credential);
                const token = credential.accessToken;
                console.log("token:");
                console.log(token);
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
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                // ... A  common pattern is to take the access token and pass it back to a server and the server makes calls on behalf of a person
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.error(error);
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
    };
     */

    return (
        <>
            <LoginButton
                icon={BootstrapIcons.facebookIcon(25,25)}
                buttonText={strings.LOGIN_BUTTON_FACEBOOK}
                provider={facebookAuthProvider}
                auth={auth}
            />
        </>
    );
}