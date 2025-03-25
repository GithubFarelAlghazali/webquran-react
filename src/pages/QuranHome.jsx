import { getSurahList } from "../services/quran.service";
import { useEffect, useState } from "react";
import { ListSurah } from "../components/quranComponents";
import { Link } from "react-router-dom";
import { getTerakhirDibaca } from "../services/quran.service";
import lightImg from "../assets/banner-light.png";
import { DarkToggle } from "../components/pageComponents";
import { Footer } from "./Footer";

export const QuranHome = () => {
     const [surahs, setSurah] = useState([]);
     const [surahDicari, setSurahDicari] = useState([]);

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
                    const namaLatin = surah.namaLatin.toLowerCase();
                    const nomor = surah.nomor.toString();
                    return namaLatin.includes(input) || nomor.includes(input);
               });
               setSurahDicari(hasilPencarian);
          } else {
               setSurahDicari(surahs); // Jika input kosong, tampilkan semua surah
          }
     };

     return (
          <div className="w-full font-lato">
               <div className="w-full md:w-[50vw] mx-auto mb-52">
                    <div className="rounded-full text-white bg-teal-800 dark:text-teal-800 dark:bg-white size-10 flex justify-center items-center fixed bottom-12 md:top-7 right-3">
                         <DarkToggle></DarkToggle>
                    </div>
                    <main className="rounded-lg mb-4 overflow-hidden">
                         <img src={lightImg} alt="ngajiquran hero-image" />
                    </main>
                    <header className="mb-5 w-full sticky top-3 border border-slate-700 rounded-lg">
                         <div className="w-full rounded-lg overflow-hidden shadow-lg">
                              <input type="text" placeholder="Cari Surah" id="cari_surah" className="border-b  border w-full p-2" autoComplete="false" onChange={cariSurah} />
                         </div>
                    </header>

                    {getTerakhirDibaca !== null ? (
                         <section id="terakhirBaca" className=" shadow-md rounded-lg overflow-hidden p-2 w-full mb-3 bg-teal-900 text-white dark:bg-cyan-700">
                              <Link to={"quran/" + getTerakhirDibaca.href}>{`atau, lanjutkan membaca ${getTerakhirDibaca.surah} ayat ${getTerakhirDibaca.ayat}`}</Link>
                         </section>
                    ) : (
                         ""
                    )}
                    <ul className="w-full overflow-x-scroll h-[70vh]">
                         {surahDicari.map((surah, index) => {
                              let indexArr = index + 1;
                              return (
                                   <ListSurah key={surah.nomor} nomor={surah.nomor} nama={surah.nama} namaLatin={surah.namaLatin} jumlah_ayat={surah.jumlahAyat} tempatTurun={surah.tempatTurun} garis={surahDicari.length !== indexArr}>
                                        {surah.nomor}
                                   </ListSurah>
                              );
                         })}
                    </ul>
               </div>
               <Footer></Footer>
          </div>
     );
};
