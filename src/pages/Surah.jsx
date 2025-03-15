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

     return (
          <div className="w-full mx-auto relative font-lato md:w-[50vw] ">
               <header className=" shadow-md bg-gradient-to-r from-sky-500 to-green-400 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-white border dark:border-none p-2 px-3 rounded-lg sticky top-2 w-full">
                    <div className="flex justify-between w-full">
                         <a id="navigation" href="/" className="  ">
                              <HomeIcon style="fill-current md:w-10 md:h-10 w-7 h-7"></HomeIcon>
                         </a>
                         <button popoverTarget="popup" className=" " id="navigation">
                              <FindAyatIcon style="fill-current md:w-10 md:h-10 w-7 h-7"></FindAyatIcon>
                         </button>
                    </div>
                    <h1 className="md:text-5xl text-4xl font-bold  font-uthmani  ">{surah.nama}</h1>
                    <h2 className="capitalize">
                         {surah.tempat_turun}
                         <br />
                         {surah.jumlah_ayat} ayat
                    </h2>
                    <div className="flex justify-between items-center text-2xl mb-2 md:mb-0 w-full ">
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

                    <div popover="" id="popup" className="border border-slate-300 bg-white p-5 rounded-md shadow-md fixed  md:left-80 md:right-80 none">
                         {surah.nama_latin} ayat:
                         <br />
                         <input type="number" max={ayat.length} className="my-2 border-b border-b-slate-700 focus:outline-none" placeholder={"1-" + ayat.length} onChange={cariAyat} id="cari" />
                         <br />
                         <a href={"#" + idAyatTujuan} className="bg-teal-700 p-2 text-white rounded-sm">
                              Cari
                         </a>
                    </div>
               </header>
               <ul className=" w-full md:w-[50vw] mx-auto dark:text-white">
                    {bismilah ? <Basmalah></Basmalah> : ""}
                    {ayat.map((ayatt, index) => {
                         let indexArr = index + 1;
                         return <ListAyat id={ayatt.id} nama={surah.nama_latin} nomorSurah={surah.nomor} nomor={ayatt.nomor} ar={ayatt.ar} idn={ayatt.idn} tr={ayatt.tr} garis={ayat.length !== indexArr}></ListAyat>;
                    })}
               </ul>
          </div>
     );
};
