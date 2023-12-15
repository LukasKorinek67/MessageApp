import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import * as strings from "../strings/strings";
import LoginGoogleButton from "../components/buttons/login-buttons/LoginGoogleButton";
import LoginFacebookButton from "../components/buttons/login-buttons/LoginFacebookButton";
import BootstrapIcons from "../utils/BootstrapIcons";
import Stack from "react-bootstrap/Stack";


export default function LoginPage() {
    return (
        <>
            {/*<Header/>
            <div className="main_content">
                <Card className="pageCard shadow-lg p-3 bg-light rounded">
                    <Container>
                        <div className="content">
                            <h1>Login</h1>
                            <LoginGoogleButton />
                            <LoginFacebookButton />
                            <div className="card_bottom"></div>
                        </div>
                    </Container>
                </Card>
            </div>
            <Footer />*/}

            <div className="mainPage">
                <div className="mainPage_box">
                    <Card bg="light" border="dark" className="mainPage_card" >
                        <Container>
                            <Stack className="mainPage_h1" direction="horizontal" gap={0}>
                                {BootstrapIcons.chatWithDots(40,40)}
                                <h1><span className="badge badge-light">{strings.APP_NAME}</span></h1>
                            </Stack>


                            {/*<h1 className="mainPage_h1"><span className="badge badge-light">MessageApp</span></h1>*/}
                            <Card bg="light" border="light" className="mainPage_card">
                                <LoginGoogleButton />
                                <LoginFacebookButton />
                            </Card>
                        </Container>
                    </Card>
                </div>
            </div>

        </>
    );
}





/*
export const App = () => {
    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <div>
                <button
                    onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                >Sign In with Google</button>
                <button
                    data-testid="signin-anon"
                    onClick={() => {
                        firebase.auth().signInAnonymously();
                    }}
                >Sign In Anonymously</button>
                <button
                    onClick={() => {
                        firebase.auth().signOut();
                    }}
                >Sign Out</button>
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                        return (
                            <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
                        );
                    }}
                </FirebaseAuthConsumer>
                <div>
                    <IfFirebaseAuthed>
                        {() => {
                            return <div>You are authenticated</div>;
                        }}
                    </IfFirebaseAuthed>
                    <IfFirebaseAuthedAnd
                        filter={({ providerId }) => providerId !== "anonymous"}
                    >
                        {({ providerId }) => {
                            return <div>You are authenticated with {providerId}</div>;
                        }}
                    </IfFirebaseAuthedAnd>
                </div>
            </div>
        </FirebaseAuthProvider>
    );
};
render(<App />, document.getElementById("root"));

*/