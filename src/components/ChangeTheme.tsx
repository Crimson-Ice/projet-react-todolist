import React, {useEffect, useState} from 'react';

const ChangeTheme = () => {
    const [theme, setTheme] = useState("dark");

    const handleChangeTheme = () => {
        setTheme(theme === "dark" ? "white" : "dark");
    }

    useEffect(() => {
        const urlDark = "/img/bg-desktop-dark.jpg";
        const urlLight = "/img/bg-desktop-light.jpg";
        const root = document.documentElement;
            root.style.setProperty('--backgroundColor-page', theme === "dark" ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)");
            root.style.setProperty('--backgroundColor-task', theme === "dark" ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)");
            root.style.setProperty('--font-color', theme === "dark" ? "hsl(234, 39%, 85%)" : "hsl(233, 14%, 35%)");
            root.style.setProperty('--very-dark-grey', theme === "dark" ? "hsl(237, 14%, 26%)" : "hsl(235, 19%, 35%)");
            root.style.setProperty('--dark-grey', theme === "dark" ? "hsl(233, 14%, 35%)" : "hsl(233, 11%, 84%)");
            root.style.setProperty('--button-hover', theme === "dark" ? "hsl(236, 33%, 92%)" : "hsl(237, 14%, 26%)");
            root.style.setProperty('--taskItem-border', theme === "dark" ? "hsl(237, 14%, 26%)" : "hsl(233, 11%, 84%)");
            root.style.setProperty('--taskFilter-color', theme === "dark" ? "hsl(233, 14%, 35%)" : "hsl(236, 9%, 61%)");
            root.style.setProperty('--cross-color', theme === "dark" ? "hsl(233, 14%, 35%)" : "hsl(233, 14%, 35%)");
            root.style.setProperty('--background-image', theme === "dark" ? `url(${urlDark})` : `url(${urlLight})`);
    }, [theme]);


    return (
        <button onClick={handleChangeTheme} className="theme-button">
            {theme === "dark" && <i className="fa-solid fa-sun fa-lg"></i>}
            {theme === "white" && <i className="fa-solid fa-moon fa-lg"></i>}
        </button>
    );
};

export default ChangeTheme;
