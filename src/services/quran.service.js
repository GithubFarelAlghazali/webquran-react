import axios from "axios";

export const getSurahList = (callback) => {
     axios.get("https://equran.id/api/v2/surat")
          .then((res) => {
               callback(res.data.data);
          })
          .catch((err) => {
               console.log(err);
          });
};
export const getSurahAyat = (id, callback) => {
     axios.get("https://equran.id/api/v2/surat/" + id.id)
          .then((res) => {
               callback(res.data.data);
          })
          .catch((err) => {
               callback(err);
          });
};

export const setTerakhirDibaca = (id, nomorSurah, surah, ayat) => {
     const dibaca = `${nomorSurah}#${id}`;
     const terakhirDibaca = {
          href: dibaca,
          surah: surah,
          ayat: ayat,
     };
     localStorage.setItem("terakhirDibaca", JSON.stringify(terakhirDibaca));
};

export const getTerakhirDibaca = localStorage.getItem("terakhirDibaca") ? JSON.parse(localStorage.getItem("terakhirDibaca")) : "";

// export const themeSettings = (theme, font, audio) => {
//      const themeSetting = {
//           theme,
//           font,
//           audio,
//      };
//      localStorage.setItem("theme", JSON.stringify(themeSetting));
// };
