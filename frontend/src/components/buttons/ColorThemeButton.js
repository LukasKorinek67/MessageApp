import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BootstrapIcons from "../../utils/BootstrapIcons";
import * as strings from "../../strings/strings";

export default function ColorThemeButton({setNewColor}) {
    return (
        <DropdownButton id="dropdown-basic-button" variant="primary" size="sm" title={BootstrapIcons.colorTheme(20,20)}>
            <Dropdown.Item className="text-blue ps-4" onClick={() => setNewColor("blue")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_BLUE}</Dropdown.Item>
            <Dropdown.Item className="text-indigo ps-4" onClick={() => setNewColor("indigo")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_INDIGO}</Dropdown.Item>
            <Dropdown.Item className="text-pink ps-4" onClick={() => setNewColor("pink")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_PINK}</Dropdown.Item>
            <Dropdown.Item className="text-red ps-4" onClick={() => setNewColor("red")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_RED}</Dropdown.Item>
            <Dropdown.Item className="text-orange ps-4" onClick={() => setNewColor("orange")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_ORANGE}</Dropdown.Item>
            <Dropdown.Item className="text-yellow ps-4" onClick={() => setNewColor("yellow")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_YELLOW}</Dropdown.Item>
            <Dropdown.Item className="text-green ps-4" onClick={() => setNewColor("green")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_GREEN}</Dropdown.Item>
            <Dropdown.Item className="text-teal ps-4" onClick={() => setNewColor("teal")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_TEAL}</Dropdown.Item>
            <Dropdown.Item className="text-cyan ps-4" onClick={() => setNewColor("cyan")}>{BootstrapIcons.colorThemeFill(15,15)} {strings.COLOR_THEME_BUTTON_CYAN}</Dropdown.Item>
        </DropdownButton>
    );
}