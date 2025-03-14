import { useState } from "react";
import { Bookmark, CopyIcon } from "../assets/icons";
import { setTerakhirDibaca } from "../services/quran.service";

export const ListSurah = (props) => {
     const { nomor, children, nama, namaLatin, jumlah_ayat, tempatTurun, garis } = props;
     return (
          <li className={(garis ? "border-b border-b-slate-700" : "") + " justify-between p-2 gap-2 flex text-slate-800 dark:text-white"}>
               <div className="w-[10%] text-center items-center justify-center">
                    <h3>{nomor}</h3>
               </div>
               <a href={"/quran/" + children} className="flex justify-between w-[90%] ">
                    <h2 className="text-xl font-semibold text-left">
                         {namaLatin}{" "}
                         <span className="block text-base font-medium">
                              <span className="capitalize">{tempatTurun}</span> | {jumlah_ayat} Ayat
                         </span>
                    </h2>
                    <h3 className="text-3xl items-center font-uthmani text-teal-800 dark:text-violet-200">{nama}</h3>
               </a>
          </li>
     );
};

export const ListAyat = (props) => {
     const { id, nomor, ar, idn, nama, nomorSurah, garis, tr } = props;
     const [notifStatus, setNotifStatus] = useState({ status: false, mes: "" });
     const parser = new DOMParser();

     const notif = (mes) => {
          setNotifStatus({ status: true, mes });
          setTimeout(() => {
               setNotifStatus({ status: false, mes });
          }, 3000);
          return notifStatus;
     };

     const copy = `Allah Subhanahu wa ta'ala berfirman:\n${ar}\nArtinya: ${idn}\nSurah ${nama} ayat ${nomor}`;
     const copyAyat = () => {
          navigator.clipboard.writeText(copy);
          notif("Ayat berhasil disalin");
     };

     const handleBookmark = () => {
          setTerakhirDibaca(id, nomorSurah, nama, nomor);
          notif("Ayat berhasil ditandai sebagai terakhir baca");
     };

     return (
          <li className={(garis ? "border-b border-b-slate-700" : "") + " justify-between py-7 px-2  gap-2 flex scroll-m-40"} id={id}>
               <div className="w-[10%] text-center items-center flex flex-col justify-start gap-3">
                    <h3>{nomor}</h3>
                    <button onClick={handleBookmark}>
                         <Bookmark style="fill-current text-teal-800 dark:text-purple-500"></Bookmark>
                    </button>
                    <button onClick={copyAyat} popoverTarget="popupAyat">
                         <CopyIcon style="fill-current text-teal-800 dark:text-purple-500"></CopyIcon>
                    </button>
               </div>
               <div className="w-full ">
                    <h2 className="font-semibold text-3xl font-uthmani text-right mb-7 leading-[2em] md:leading-[2em] text-teal-900 dark:text-inherit">{ar}</h2>

                    <h3 className="text-left text-slate-800 dark:text-inherit">
                         <b>Artinya: </b>
                         {idn}
                    </h3>
               </div>
               {notifStatus.status ? <div className=" fixed bottom-[10vh] left-10 right-10 md:left-[40vw] md:right-[40vw] bg-white border border-slate-600 p-2 rounded-md text-black">{notifStatus.mes}</div> : ""}
          </li>
     );
};
export const Basmalah = () => {
     return (
          <li className="border-b border-b-slate-700 justify-between py-7 px-2  gap-2 flex  text-center">
               <div className="w-full ">
                    <h2 className="font-semibold text-2xl md:text-3xl font-uthmani  mb-7 leading-[2em] md:leading-[2em]">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>

                    <h3>
                         <i>Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</i>
                    </h3>
               </div>
          </li>
     );
};
