import { getSurahList } from "../services/quran.service";
import { useEffect, useState } from "react";
import { ListSurah } from "../components/quranComponents";
import { Link } from "react-router-dom";
import { DarkIcon, LightIcon } from "../assets/icons";

export const QuranHome = () => {
     const [surahs, setSurah] = useState([]);
     const [surahDicari, setSurahDicari] = useState([]);
     const [terakhirDibaca, setTerakhirDibaca] = useState("");
     const [surahTerakhir, setSurahTerakhir] = useState("");
     const [ayatTerakhir, setAyatTerakhir] = useState("");
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

     useEffect(() => {
          getSurahList((data) => {
               setSurah(data);
               setSurahDicari(data);
               if (localStorage.getItem("terakhirDibaca")) {
                    setTerakhirDibaca(localStorage.getItem("terakhirDibaca"));
                    setAyatTerakhir(localStorage.getItem("ayatTerakhir"));
                    setSurahTerakhir(localStorage.getItem("suratTerakhir"));
               }
          });
     }, []);

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

     useEffect(() => {
          getSurahList((data) => {
               setSurah(data);
               setSurahDicari(data);
               if (!localStorage.getItem("terakhirDibaca")) {
                    setTerakhirDibaca("");
                    setAyatTerakhir("");
                    setSurahTerakhir("");
               } else {
                    setTerakhirDibaca(localStorage.getItem("terakhirDibaca"));
                    setAyatTerakhir(localStorage.getItem("ayatTerakhir"));
                    setSurahTerakhir(localStorage.getItem("suratTerakhir"));
               }
          });
     }, []);

     // useEffect(() => {
     //      localStorage.getItem("theme") ? setTheme(localStorage.getItem("theme")) : localStorage.setItem("theme", theme);

     //      const html = document.querySelector("html");
     //      if (theme === "dark") {
     //           html.classList.add("dark");
     //           document.body.style.background = "black";
     //      } else {
     //           html.classList.remove("dark");
     //           document.body.style.background = "white";
     //      }
     // });

     // const changeTheme = () => {
     //      const newTheme = theme === "dark" ? "light" : "dark";
     //      localStorage.setItem("theme", newTheme);
     //      setTheme(newTheme);
     // };

     const cariSurah = (event) => {
          const input = event.target.value.toLowerCase(); // Ubah input ke lowercase
          if (input !== "") {
               const hasilPencarian = surahs.filter((surah) => {
                    const namaLatin = surah.nama_latin.toLowerCase();
                    const nomor = surah.nomor.toString();
                    return namaLatin.includes(input) || nomor.includes(input);
               });
               setSurahDicari(hasilPencarian);
          } else {
               setSurahDicari(surahs); // Jika input kosong, tampilkan semua surah
          }
     };

     return (
          <div className="w-full md:w-[50vw] mx-auto font-lato">
               <button onClick={changeTheme}>{theme === "light" ? <DarkIcon style="text-teal-900 fill-current"></DarkIcon> : <LightIcon style="text-white fill-current"></LightIcon>}</button>
               <header className="mb-5 w-full">
                    <h1 className="text-2xl font-bold mb-5">Al-Quran Indonesia</h1>
                    <div className="w-full rounded-md overflow-hidden shadow-lg bg-red-300">
                         <input type="text" placeholder="Cari Surah" id="cari_surah" className="border-b border-b-slate-400 border w-full p-2" autoComplete="false" onChange={cariSurah} />
                    </div>
               </header>

               {localStorage.getItem("terakhirDibaca") ? (
                    <section className="bg-teal-100  dark:bg-black dark:border dark:border-slate-400 shadow-md rounded-sm p-2 w-full mb-3">
                         <Link to={"quran/" + terakhirDibaca}>{`atau, lanjutkan membaca ${surahTerakhir} ayat ${ayatTerakhir}`}</Link>
                    </section>
               ) : (
                    ""
               )}
               <ul className="text-teal-900 dark:text-white w-fll h-[60vh] overflow-scroll">
                    {surahDicari.map((surah) => {
                         return (
                              <ListSurah key={surah.nomor} nomor={surah.nomor} nama={surah.nama} namaLatin={surah.nama_latin} jumlah_ayat={surah.jumlah_ayat} tempatTurun={surah.tempat_turun}>
                                   {surah.nomor}
                              </ListSurah>
                         );
                    })}
               </ul>
          </div>
     );
};
