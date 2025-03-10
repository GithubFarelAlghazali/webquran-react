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
               <header className="left-0 right-0 mb-5 w-full bg-white shadow-md border p-2 rounded-md sticky top-0">
                    <a href="/" className="absolute  left-2 p-2 rounded-sm">
                         <HomeIcon style="fill-current text-teal-800 w-9 h-9"></HomeIcon>
                    </a>
                    <div className="flex justify-between w-[80%] mx-auto ">
                         <h4 className="capitalize text-left">
                              Surah ke-{surah.nomor} <br />
                              {surah.arti}
                         </h4>
                         <h1 className="text-4xl font-bold mb-5 font-amiri">{surah.nama}</h1>
                         <h4 className="capitalize text-right">
                              {surah.tempat_turun} <br />
                              {surah.jumlah_ayat} Ayat
                         </h4>
                    </div>
                    <div className="flex justify-between items-center text-2xl">
                         {selanjutnya ? (
                              <a href={"/quran/" + selanjutnya.nomor}>
                                   <ArrowBack style="fill-current text-teal-900" />
                              </a>
                         ) : (
                              " "
                         )}
                         {sebelumnya ? (
                              <a href={"/quran/" + sebelumnya.nomor}>
                                   <ArrowForward style="fill-current text-teal-900" />
                              </a>
                         ) : (
                              " "
                         )}
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
                         <FindAyatIcon style="fill-current text-teal-700 w-9 h-9"></FindAyatIcon>
                    </button>
               </header>
               <ul className="text-teal-900 w-full md:w-[50vw] mx-auto">
                    {bismilah ? <Basmalah></Basmalah> : ""}
                    {ayat.map((ayatt) => {
                         return <ListAyat id={ayatt.id} nama={surah.nama_latin} nomor={ayatt.nomor} ar={ayatt.ar} idn={ayatt.idn}></ListAyat>;
                    })}
               </ul>
          </div>
     );
};
