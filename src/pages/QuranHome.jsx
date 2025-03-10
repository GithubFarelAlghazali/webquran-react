import { getSurahList } from "../services/quran.service";
import { useEffect, useState } from "react";
import { ListSurah } from "../components/quranComponents";

export const QuranHome = () => {
     const [surahs, setSurah] = useState([]);
     const [surahDicari, setSurahDicari] = useState([]);
     const [terakhirDibaca, setTerakhirDibaca] = useState();
     useEffect(() => {
          getSurahList((data) => {
               setSurah(data);
               setSurahDicari(data);
               setTerakhirDibaca(localStorage.getItem("terakhirDibaca"));
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
          <div className="w-full md:w-[50vw] mx-auto text-slate-800 font-lato">
               <header className="mb-5 w-full">
                    <h1 className="text-2xl font-bold mb-5">Al-Quran Indonesia</h1>
                    <div className="w-full rounded-md overflow-hidden shadow-lg bg-red-300">
                         <input type="text" placeholder="Cari Surah" id="cari_surah" className="border-b border-b-slate-400 border w-full p-2" autoComplete="false" onChange={cariSurah} />
                    </div>
               </header>
               <section>
                    <a href={"quran/" + terakhirDibaca}>Terakhir dibaca</a>
               </section>
               <ul className="text-teal-900 w-fll h-[70vh] overflow-scroll">
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
