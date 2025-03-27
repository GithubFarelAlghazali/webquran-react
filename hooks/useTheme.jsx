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

     // set translate appereance
     const [isId, setIsId] = useState(() => {
          const storedId = localStorage.getItem("id");
          return storedId !== null ? JSON.parse(storedId) : true;
     });

     useEffect(() => {
          localStorage.setItem("id", JSON.stringify(isTr));
     }, [isTr]);

     const setId = (condition) => {
          setIsId(condition);
     };

     // set font size
     const [fontSz, setFontSize] = useState(() => {
          const storedFontSize = localStorage.getItem("fontSize");
          return storedFontSize !== null ? storedFontSize : 30;
     });

     useEffect(() => {
          localStorage.setItem("fontSize", fontSz);
     }, [fontSz]);

     const changeSize = (condition) => {
          setFontSize(condition);
     };

     return (
          <ThemeContext.Provider
               value={{
                    arFont,
                    changeFont,
                    isTr,
                    setTr,
                    isId,
                    setId,
                    fontSz,
                    changeSize,
               }}
          >
               {children}
          </ThemeContext.Provider>
     );
};

export const useTheme = () => useContext(ThemeContext);
