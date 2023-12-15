import { useState } from 'react';

import LightDarkModeButton from "./LightDarkModeButton";
import ColorThemeButton from "./ColorThemeButton";

export default function ThemeButtons() {
    const [isDarkMode, setIsDarkMode] = useState(getMode());
    const [color, setColor] = useState(getColor());
    

    function getMode() {
        const rootElement = document.getElementById("root");
        const actualTheme = rootElement.getAttribute("data-bs-theme");
        if(actualTheme.includes("dark")){
            return true;
        } else {
            return false;
        }
    }

    function getColor() {
        const rootElement = document.getElementById("root");
        const actualTheme = rootElement.getAttribute("data-bs-theme");
        let color;
        if(actualTheme.includes("dark")){
            color = actualTheme.replace("-dark", "");
        } else {
            color = actualTheme.replace("-light", "");
        }
        return color;
    }

    function setDarkMode(mode) {
        const rootElement = document.getElementById("root");
        if (rootElement) {
            const actualTheme = rootElement.getAttribute("data-bs-theme");
            let newTheme;
            if(actualTheme.includes("dark")){
                newTheme = actualTheme.replace("dark", mode);
            } else {
                newTheme = actualTheme.replace("light", mode);
            }
            rootElement.setAttribute("data-bs-theme", newTheme);
        }
        if(mode === "dark"){
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }

    function setNewColor(color) {
        const rootElement = document.getElementById('root');
        if (rootElement) {
            const actualTheme = rootElement.getAttribute("data-bs-theme");
            let newTheme;
            if(actualTheme.includes("dark")){
                newTheme = color.concat("-dark");
            } else {
                newTheme = color.concat("-light");
            }
            rootElement.setAttribute("data-bs-theme", newTheme);
        }
        setColor(color);
    }
    
    return (
        <>
            <div className="text-light">
                <LightDarkModeButton setDarkMode={setDarkMode}/>
            </div>
            <div className="me-2 text-light">
                <ColorThemeButton setNewColor={setNewColor}/>
            </div>
        </>
    );
}