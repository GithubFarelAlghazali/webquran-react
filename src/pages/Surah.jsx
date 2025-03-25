import { getSurahAyat } from "../services/quran.service";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ListAyat, Basmalah } from "../components/quranComponents";
import { ArrowBack, ArrowForward, HomeIcon, FindAyatIcon } from "../assets/icons";
import { DarkToggle, Settings } from "../components/pageComponents";
import { Footer } from "./Footer";

export const Surah = () => {
     const id = useParams();
     const [surah, setSurah] = useState({});
     const [ayat, setAyat] = useState([]);
     const [idAyatTujuan, setIdAyatTujuan] = useState();
     const [bismilah, setBismilah] = useState(true);
     const location = useLocation();
     useEffect(() => {
          getSurahAyat(id, (data) => {
               setSurah(data);
               setAyat(data.ayat);
               if (data.nomor == 1 || data.nomor == 9) {
                    setBismilah(false);
               }
          });
     }, [id]);

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

     const selanjutnya = surah.suratSelanjutnya;
     const sebelumnya = surah.suratSebelumnya;
     const cariAyat = (event) => {
          const cariValue = event.target.value;
          let foundId = 0;

          for (let i = 0; i < ayat.length; i++) {
               if (ayat[i].nomorAyat === parseInt(cariValue)) {
                    // Pastikan perbandingan menggunakan integer
                    foundId = ayat[i].nomorAyat;
                    break;
               }
          }
          setIdAyatTujuan(foundId);
     };

     return (
          <div className="w-full font-lato ">
               <div className="w-full mx-auto relative md:w-[50vw] mb-44">
                    <Settings></Settings>
                    <div className="rounded-full text-white bg-slate-700 dark:text-slate-700 dark:bg-white size-10 flex justify-center items-center fixed bottom-12 md:bottom-24 right-3 z-30">
                         <DarkToggle></DarkToggle>
                    </div>
                    <header className=" shadow-md bg-gradient-to-r from-sky-500 to-green-400  text-white border dark:border-none p-2 px-3 rounded-lg sticky top-2 w-full">
                         <div className="flex justify-between  absolute top-2 left-3 right-3">
                              <a id="navigation" href="/" className="  ">
                                   <HomeIcon style="fill-current md:w-10 md:h-10 w-7 h-7"></HomeIcon>
                              </a>
                              <button popoverTarget="popup" className=" " id="navigation">
                                   <FindAyatIcon style="fill-current md:w-10 md:h-10 w-7 h-7"></FindAyatIcon>
                              </button>
                         </div>
                         <h1 className="md:text-5xl text-4xl font-bold  font-uthmani mt-4 mb-2">{surah.nama}</h1>
                         <h2 className="capitalize mb-4">
                              {surah.namaLatin} | {surah.jumlahAyat} ayat
                         </h2>
                         <div className="flex justify-between items-center text-sm mb-2 md:mb-0 right-3 left-3 absolute bottom-5">
                              {selanjutnya ? (
                                   <a href={"/quran/" + selanjutnya.nomor} className="flex items-start flex-col">
                                        <ArrowBack style="fill-current  w-7 h-7" />
                                        <span className="hidden md:block text-left">{selanjutnya.namaLatin}</span>
                                   </a>
                              ) : (
                                   <span className="w-10"></span>
                              )}
                              {sebelumnya ? (
                                   <a href={"/quran/" + sebelumnya.nomor} className="flex items-end flex-col ">
                                        <ArrowForward style="fill-current w-7 h-7 text-right" />
                                        <span className="hidden md:block text-right">{sebelumnya.namaLatin}</span>
                                   </a>
                              ) : (
                                   " "
                              )}
                         </div>

                         <div popover="" id="popup" className="border border-slate-300 bg-white p-5 rounded-md shadow-md fixed  md:left-80 md:right-80 none">
                              {surah.namaLatin} ayat:
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
                              return (
                                   <ListAyat
                                        key={ayatt.nomorAyat}
                                        id={ayatt.nomorAyat}
                                        nama={surah.namaLatin}
                                        nomorSurah={surah.nomor}
                                        nomor={ayatt.nomorAyat}
                                        ar={ayatt.teksArab}
                                        idn={ayatt.teksIndonesia}
                                        tr={ayatt.teksLatin}
                                        garis={ayat.length !== indexArr}
                                   ></ListAyat>
                              );
                         })}
                    </ul>
               </div>
               <Footer></Footer>
          </div>
     );
};
