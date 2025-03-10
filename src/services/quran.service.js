import axios from "axios";

export const getSurahList = (callback) => {
     axios.get("https://quran-api.santrikoding.com/api/surah")
          .then((res) => {
               callback(res.data);
          })
          .catch((err) => {
               console.log(err);
          });
};
export const getSurahAyat = (id, callback) => {
     axios.get("https://quran-api.santrikoding.com/api/surah/" + id.id)
          .then((res) => {
               callback(res.data);
          })
          .catch((err) => {
               callback(err);
          });
};

export const setTerakhirDibaca = (id, nomor) => {
     const dibaca = `${nomor}#${id}`;
     localStorage.setItem("terakhirDibaca", dibaca);
};
