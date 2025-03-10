import { getSurahAyat } from "../services/quran.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListAyat, Basmalah } from "../components/quranComponents";
import { ArrowBack, ArrowForward, HomeIcon, FindAyatIcon } from "../assets/icons";

export const Surah = () => {
     const id = useParams();
     const [surah, setSurah] = useState({});
     const [ayat, setAyat] = useState([]);
     const [idAyatTujuan, setIdAyatTujuan] = useState();
     const [bismilah, setBismilah] = useState(true);

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
          <div className="w-full mx-auto text-slate-800  relative font-lato">
               <header className=" w-full bg-white shadow-md border p-2 rounded-md sticky  top-3 h-28">
                    <a href="/" className="absolute  left-2 p-2 rounded-sm">
                         <HomeIcon style="fill-current text-teal-800 md:w-9 md:h-9 w-5 h-5"></HomeIcon>
                    </a>
                    <h1 className="md:text-4xl text-2xl font-bold md:mb-5 mb-3 font-amiri">{surah.nama}</h1>
                    <div className="flex justify-between items-center text-2xl mb-2 md:mb-0">
                         {selanjutnya ? (
                              <a href={"/quran/" + selanjutnya.nomor}>
                                   <ArrowBack style="fill-current text-teal-900 w-3 h-3 md:w-7 md:h-7" />
                              </a>
                         ) : (
                              " "
                         )}
                         {sebelumnya ? (
                              <a href={"/quran/" + sebelumnya.nomor}>
                                   <ArrowForward style="fill-current text-teal-900 w-3 h-3 md:w-7 md:h-7" />
                              </a>
                         ) : (
                              " "
                         )}
                    </div>
                    <hr className="border-b-teal-700 border-b md:hidden" />

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
                    <div popover="" id="popup" className="bg-white p-5 rounded-md shadow-md fixed  md:left-80 md:right-80 none">
                         {surah.nama_latin} ayat:
                         <br />
                         <input type="number" max={ayat.length} className="my-2 border-b border-b-slate-700 focus:outline-none" placeholder={"1-" + ayat.length} onChange={cariAyat} id="cari" />
                         <br />
                         <a href={"#" + idAyatTujuan} className="bg-teal-700 p-2 text-white rounded-sm">
                              Cari
                         </a>
                    </div>
                    <button popoverTarget="popup" className="p-2 rounded-sm absolute top-2 right-2">
                         <FindAyatIcon style="fill-current text-teal-700 w-5 h-5 md:w-9 md:h-9"></FindAyatIcon>
                    </button>
               </header>
               <ul className="text-teal-900 w-full md:w-[50vw] mx-auto">
                    {bismilah ? <Basmalah></Basmalah> : ""}
                    {ayat.map((ayatt) => {
                         return <ListAyat id={ayatt.id} nama={surah.nama_latin} nomorSurah={surah.nomor} nomor={ayatt.nomor} ar={ayatt.ar} idn={ayatt.idn}></ListAyat>;
                    })}
               </ul>
          </div>
     );
};
