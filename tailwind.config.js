/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               fontFamily: {
                    lato: ["Lato", "sans-serif"],
                    quicksand: ["Quicksand", "sans-serif"],
                    amiri: ["Amiri Quran", "serif"],
                    ayat: ["Ayat Quran 1", "serif"],
               },
          },
     },
     plugins: [],
};
