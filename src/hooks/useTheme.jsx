import { createContext, useContext, useState, useEffect } from "react";

// change-font
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
     //    change font
     const [arFont, setFont] = useState(() => {
          return localStorage.getItem("font") || "uthmani";
     });

     useEffect(() => {
          localStorage.setItem("font", arFont);
     }, [arFont]);

     const changeFont = (newFont) => {
          setFont(newFont);
     };

     // set transliteration appereance
     const [isTr, setIsTr] = useState(() => {
          const storedTr = localStorage.getItem("tr");
          return storedTr !== null ? JSON.parse(storedTr) : true;
     });

     useEffect(() => {
          localStorage.setItem("tr", JSON.stringify(isTr));
     }, [isTr]);

     const setTr = (condition) => {
          setIsTr(condition);
     };

     return <ThemeContext.Provider value={{ arFont, changeFont, isTr, setTr }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
