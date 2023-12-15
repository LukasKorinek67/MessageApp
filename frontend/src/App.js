import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";
import {LoggedUserContext} from "./context/LoggedUserContext";
import {useState} from "react";


const router = createBrowserRouter([
    { element: <UnauthenticatedRoute />, children: [{ path: "/login", element: <LoginPage /> }]},
    { element: <AuthenticatedRoute />, children: [
            { path: "/", element: <MainPage /> }
        ]
    },
    { path: "*", Component: NotFoundPage },
]);

export default function App() {
    const [loggedUser, setLoggedUser] = useState(null);

    return (
        <>
            <LoggedUserContext.Provider value={{loggedUser, setLoggedUser}}>
                <RouterProvider router={router} />
            </LoggedUserContext.Provider>
        </>
    );
}
