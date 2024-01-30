import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import BootstrapIcons from "../../../utils/BootstrapIcons";
import LoginButton from "./LoginButton";
import * as strings from "../../../strings/strings.js";
import auth from "../../../config/firebase.js";


export default function LoginGoogleButton() {
    const googleAuthProvider = new GoogleAuthProvider();

    /*
    function signInWithGoogle() {
        const googleAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
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

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
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
                icon={BootstrapIcons.googleIcon(25,25)}
                buttonText={strings.LOGIN_BUTTON_GOOGLE}
                provider={googleAuthProvider}
                auth={auth}
            />
        </>
    );
}