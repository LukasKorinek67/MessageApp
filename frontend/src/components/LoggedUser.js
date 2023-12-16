import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BootstrapIcons from "../utils/BootstrapIcons";
import {useContext} from "react";
import {LoggedUserContext} from "../context/LoggedUserContext";
import * as strings from "../strings/strings";
import { getAuth, signOut } from "firebase/auth";

export default function LoggedUser() {
    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);
    const auth = getAuth();
    function logout() {
        signOut(auth)
            .then(() => {
                setLoggedUser(null);
            })
            .catch((error) => {
                console.error("Chyba při odhlašování uživatele:", error);
            });
    };

    return (
        <>
            <DropdownButton variant="outline-light" title={<UserInfo loggedUser={loggedUser}/>}>
                <Dropdown.Item eventKey="1" onClick={logout}>{strings.LOGOUT}</Dropdown.Item>
            </DropdownButton>
        </>
    );
}

function UserInfo({ loggedUser }) {
    return (
      <>
          {(loggedUser.provider == "google.com") &&
              <>
                {BootstrapIcons.googleIcon(23,23)}&nbsp;&nbsp;{loggedUser.username}
              </>
          }
          {(loggedUser.provider == "facebook.com") &&
              <>
                  {BootstrapIcons.facebookIcon(23,23)}&nbsp;&nbsp;{loggedUser.username}
              </>
          }
          {(loggedUser.provider != "google.com" && loggedUser.provider != "facebook.com") &&
              <>
                  {BootstrapIcons.user(25,25)}&nbsp;&nbsp;{loggedUser.username}
              </>
          }
      </>
    );
  }