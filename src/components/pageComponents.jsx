import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { LightIcon, DarkIcon, SettingIcon, CloseIcon } from "../assets/icons";

export const DarkToggle = () => {
     const [theme, setTheme] = useState(() => {
          if (typeof window !== "undefined") {
               return localStorage.getItem("theme") || "light";
          }
          return "light";
     });

     useEffect(() => {
          if (typeof window !== "undefined") {
               document.documentElement.classList.toggle("dark", theme === "dark");
          }
     }, [theme]);

     const changeTheme = () => {
          const newTheme = theme === "dark" ? "light" : "dark";
          setTheme(newTheme);
          localStorage.setItem("theme", newTheme);

          if (newTheme === "dark") {
               document.documentElement.classList.add("dark");
          } else {
               document.documentElement.classList.remove("dark");
          }
     };

     return <button onClick={changeTheme}>{theme === "light" ? <DarkIcon style=" fill-current"></DarkIcon> : <LightIcon style=" fill-current"></LightIcon>}</button>;
};

export const Settings = () => {
     const [isOpen, setOpen] = useState(false);
     const { changeFont, setTr, isTr, setId, isId, fontSz, changeSize } = useTheme();
     const selectedFont = localStorage.getItem("font");

     const visibleSetting = () => {
          isOpen ? setOpen(false) : setOpen(true);
     };

     return (
          <>
               <div className="flex justify-end fixed bottom-24 items-center right-3 gap-5 md:bottom-12 text-slate-700 dark:text-white z-30">
                    <label className="hidden md:block  font-semibold  " htmlFor="settingBtn">
                         Pengaturan
                    </label>
                    <button onClick={visibleSetting} className="p-1 rounded-full bg-slate-700 text-white dark:bg-white dark:text-slate-700" id="settingBtn">
                         {isOpen ? <CloseIcon style="fill-current"></CloseIcon> : <SettingIcon style="fill-current hover:rotate-90 transition-all duration-200 "></SettingIcon>}
                    </button>
               </div>
               <ul
                    id="settings"
                    className={
                         (isOpen ? "right-3" : "-right-56") + " transition-all duration-500 flex flex-col fixed bottom-36  bg-white p-3 text-teal-900  rounded-lg z-10 border border-slate-700 justify-start items-start gap-1  md:w-[15vw] text-start"
                    }
               >
                    <h4 className="font-semibold border-b border-b-slate-700 text-slate-900 w-full mb-2 ">Pengaturan</h4>
                    <li>
                         <label htmlFor="font">Font:</label>
                         <select name="font" id="font" className="bg-transparent" onChange={(e) => changeFont(e.target.value)}>
                              <option value="uthmani" selected={selectedFont === "uthmani"}>
                                   Uthmani
                              </option>
                              <option value="indopak" id="optIndopak" selected={selectedFont === "indopak"}>
                                   IndoPak
                              </option>
                         </select>
                    </li>
                    <li className="flex items-center">
                         <input
                              type="checkbox"
                              id="tr"
                              checked={isTr}
                              className="size-4 mx-2 accent-teal-700 focus:border-none"
                              onChange={(e) => {
                                   setTr(e.target.checked);
                              }}
                         />
                         <label htmlFor="tr">Transliterasi</label>
                    </li>
                    <li className="flex items-center">
                         <input
                              type="checkbox"
                              id="id"
                              checked={isId}
                              className="size-4 mx-2 accent-teal-700 focus:border-none"
                              onChange={(e) => {
                                   setId(e.target.checked);
                              }}
                         />
                         <label htmlFor="id">Terjemahan</label>
                    </li>
                    <li className="flex flex-col">
                         <input
                              type="range"
                              id="size"
                              min={26}
                              max={50}
                              value={fontSz}
                              className="size-4 mx-2 accent-teal-700 focus:border-none w-44"
                              onChange={(e) => {
                                   changeSize(e.target.value);
                              }}
                         />
                         <label htmlFor="size">Ukuran huruf Arab : {fontSz}px</label>
                    </li>
               </ul>
          </>
     );
};
