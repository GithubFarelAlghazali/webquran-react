import "./App.css";
import markLogo from "./assets/bookmark-square-svgrepo-com (1).svg";
import clockLogo from "./assets/clock-square-svgrepo-com.svg";
import quranLogo from "./assets/quran-svgrepo-com.svg";
import quranilustration from "./assets/malik-shibly-lKbz2ejxYbA-unsplash.jpg";

function App() {
     return (
          <div className="p-5">
               <main className=" text-white h-80 md:h-96 rounded-md overflow-hidden relative">
                    <img src={quranilustration} alt="" className="w-full lg:-translate-y-24" />
               </main>
               <h1 className="text-2xl font-bold py-3 text-slate-800  ">Ngaji di bacaQuran.com</h1>
               <section className="flex flex-col gap-3 lg:gap-4 p-3 my-4 rounded-md md:flex-row justify-evenly">
                    <a href="/quran" className="p-3  w-[80%] shadow-md rounded-md mx-auto cursor-pointer">
                         <img src={quranLogo} className="w-[30%] mx-auto" alt="" />
                         <h3>Baca Quran</h3>
                    </a>
                    <a href="" className="p-3  w-[80%] shadow-md rounded-md mx-auto cursor-pointer">
                         <img src={markLogo} className="w-[30%] mx-auto" alt="" />
                         <h3>Terakhir Baca</h3>
                    </a>
                    <a href="/jadwalb" className="p-3  w-[80%] shadow-md rounded-md mx-auto cursor-pointer">
                         <img src={clockLogo} className="w-[30%] mx-auto" alt="" />
                         <h3>Jadwal Solat</h3>
                    </a>
               </section>
          </div>
     );
}

export default App;
