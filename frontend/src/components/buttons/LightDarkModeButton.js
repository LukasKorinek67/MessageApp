
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BootstrapIcons from "../../utils/BootstrapIcons";
import * as strings from "../../strings/strings";

export default function LightDarkModeButton({setDarkMode}) {
    return (
        <DropdownButton id="dropdown-basic-button" variant="primary" size="sm" title={BootstrapIcons.lightMode(20,20)}>
            <Dropdown.Item onClick={() => setDarkMode("light")}>{BootstrapIcons.lightMode(15,15)} {strings.LIGHT_MODE_BUTTON}</Dropdown.Item>
            <Dropdown.Item onClick={() => setDarkMode("dark")}>{BootstrapIcons.darkMode(15,15)} {strings.DARK_MODE_BUTTON}</Dropdown.Item>
        </DropdownButton>
    );
}