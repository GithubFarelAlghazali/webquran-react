import { getSurahList } from "../services/quran.service";
import { useEffect, useState } from "react";
import { ListSurah } from "../components/quranComponents";
import { Link } from "react-router-dom";
import { DarkIcon, LightIcon } from "../assets/icons";
import { getTerakhirDibaca } from "../services/quran.service";
import lightImg from "../assets/banner-light.png";
import darkImg from "../assets/banner-dark.png";

export const QuranHome = () => {
     const [surahs, setSurah] = useState([]);
     const [surahDicari, setSurahDicari] = useState([]);
     // const [terakhirDibaca, setTerakhirDibaca] = useState("");
     // const [surahTerakhir, setSurahTerakhir] = useState("");
     // const [ayatTerakhir, setAyatTerakhir] = useState("");
     const [theme, setTheme] = useState(() => {
          if (typeof window !== "undefined") {
               return localStorage.getItem("theme") || "light";
          }
          return "light";
     });

     useEffect(() => {
          if (typeof window !== "undefined") {
               document.body.classList.toggle("dark", theme === "dark");
          }
     }, [theme]);

     useEffect(() => {
          getSurahList((data) => {
               setSurah(data);
               setSurahDicari(data);
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
          });
     }, []);

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
          <div className="w-full md:w-[50vw] mx-auto  font-lato">
               <button onClick={changeTheme}>{theme === "light" ? <DarkIcon style="text-teal-900 fill-current"></DarkIcon> : <LightIcon style="text-white fill-current"></LightIcon>}</button>
               <main className="rounded-lg mb-4 overflow-hidden">
                    <img src={localStorage.getItem("theme") === "light" ? lightImg : darkImg} alt="" />
               </main>
               <header className="mb-5 w-full sticky top-3 border border-slate-700 rounded-lg">
                    <div className="w-full rounded-lg overflow-hidden shadow-lg">
                         <input type="text" placeholder="Cari Surah" id="cari_surah" className="border-b  border w-full p-2" autoComplete="false" onChange={cariSurah} />
                    </div>
               </header>

               {getTerakhirDibaca !== null ? (
                    <section id="terakhirBaca" className=" shadow-md rounded-lg overflow-hidden p-2 w-full mb-3 bg-teal-900 text-white dark:bg-violet-950">
                         <Link to={"quran/" + getTerakhirDibaca.href}>{`atau, lanjutkan membaca ${getTerakhirDibaca.surah} ayat ${getTerakhirDibaca.ayat}`}</Link>
                    </section>
               ) : (
                    ""
               )}
               <ul className="w-full ">
                    {surahDicari.map((surah, index) => {
                         let indexArr = index + 1;
                         return (
                              <ListSurah key={surah.nomor} nomor={surah.nomor} nama={surah.nama} namaLatin={surah.nama_latin} jumlah_ayat={surah.jumlah_ayat} tempatTurun={surah.tempat_turun} garis={surahDicari.length !== indexArr}>
                                   {surah.nomor}
                              </ListSurah>
                         );
                    })}
               </ul>
          </div>
     );
};
