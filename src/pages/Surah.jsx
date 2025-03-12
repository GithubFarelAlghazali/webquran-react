import { getSurahAyat } from "../services/quran.service";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ListAyat, Basmalah } from "../components/quranComponents";
import { ArrowBack, ArrowForward, HomeIcon, FindAyatIcon } from "../assets/icons";

export const Surah = () => {
     const id = useParams();
     const [surah, setSurah] = useState({});
     const [ayat, setAyat] = useState([]);
     const [idAyatTujuan, setIdAyatTujuan] = useState();
     const [bismilah, setBismilah] = useState(true);
     const [theme, setTheme] = useState("light");
     const location = useLocation();

     // Scroll to the section when ayat is loaded
     useEffect(() => {
          if (ayat.length > 0 && location.hash) {
               const elementId = location.hash.replace("#", "");
               const element = document.getElementById(elementId);
               if (element) {
                    setTimeout(() => {
                         element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100); // Small delay ensures the element is rendered before scrolling
               }
          }
     }, [ayat, location]);

     useEffect(() => {
          getSurahAyat(id, (data) => {
               setSurah(data);
               setAyat(data.ayat);
               if (data.nomor == 1 || data.nomor == 9) {
                    setBismilah(false);
               }
          });
     }, [id]);

     const selanjutnya = surah.surat_selanjutnya;
     const sebelumnya = surah.surat_sebelumnya;
     // let idTujuan;
     const cariAyat = (event) => {
          const cariValue = event.target.value;
          let foundId = null;

          for (let i = 0; i < ayat.length; i++) {
               if (ayat[i].nomor === parseInt(cariValue)) {
                    // Pastikan perbandingan menggunakan integer
                    foundId = ayat[i].id;
                    break;
               }
          }
          setIdAyatTujuan(foundId);
     };

     useEffect(() => {
          localStorage.getItem("theme") ? setTheme(localStorage.getItem("theme")) : localStorage.setItem("theme", theme);

          const html = document.querySelector("html");
          if (theme === "dark") {
               html.classList.add("dark");
          } else {
               html.classList.remove("dark");
          }
     });

     return (
          <div className="w-full mx-auto relative font-lato">
               <header className=" shadow-md  border dark:border-none p-2 px-3 rounded-md fixed top-0 left-0 right-0 md:h-28">
                    <a id="navigation" href="/" className="absolute  left-3 p-2 rounded-sm">
                         <HomeIcon style="fill-current text-teal-800 dark:text-white md:w-10 md:h-10 w-7 h-7"></HomeIcon>
                    </a>
                    <button popoverTarget="popup" className="p-2 rounded-sm absolute top-2 right-3" id="navigation">
                         <FindAyatIcon style="fill-current text-teal-800 dark:text-white md:w-10 md:h-10 w-7 h-7"></FindAyatIcon>
                    </button>
                    <h1 className="md:text-5xl text-2xl font-bold md:mb-5 mb-3 font-amiri">{surah.nama}</h1>
                    <div className="flex justify-between items-center text-2xl mb-2 md:mb-0 w-full text-teal-900 dark:text-white">
                         {selanjutnya ? (
                              <a href={"/quran/" + selanjutnya.nomor}>
                                   <ArrowBack style="fill-current  w-7 h-7" />
                              </a>
                         ) : (
                              " "
                         )}
                         {sebelumnya ? (
                              <a href={"/quran/" + sebelumnya.nomor}>
                                   <ArrowForward style="fill-current w-7 h-7" />
                              </a>
                         ) : (
                              " "
                         )}
                    </div>
                    <hr className="dark:border-b-white border-b-teal-700 border-b md:hidden" />

                    <div className="flex justify-between w-full md:w-[80%] mx-auto text-xs md:text-base md:-translate-y-20">
                         <h4 className="capitalize text-left">
                              Surah ke-{surah.nomor} <br />
                              {surah.arti}
                         </h4>
                         <h4 className="capitalize text-right">
                              {surah.tempat_turun} <br />
                              {surah.jumlah_ayat} Ayat
                         </h4>
                    </div>
                    <div popover="" id="popup" className="border border-slate-300 bg-white p-5 rounded-md shadow-md fixed  md:left-80 md:right-80 none">
                         {surah.nama_latin} ayat:
                         <br />
                         <input type="number" max={ayat.length} className="my-2 border-b border-b-slate-700 focus:outline-none" placeholder={"1-" + ayat.length} onChange={cariAyat} id="cari" />
                         <br />
                         <a href={"#" + idAyatTujuan} className="bg-teal-700 p-2 text-white rounded-sm">
                              Cari
                         </a>
                    </div>

                    <button></button>
               </header>
               <ul className=" w-full md:w-[50vw] mx-auto mt-20">
                    {bismilah ? <Basmalah></Basmalah> : ""}
                    {ayat.map((ayatt) => {
                         return <ListAyat id={ayatt.id} nama={surah.nama_latin} nomorSurah={surah.nomor} nomor={ayatt.nomor} ar={ayatt.ar} idn={ayatt.idn}></ListAyat>;
                    })}
               </ul>
          </div>
     );
};
