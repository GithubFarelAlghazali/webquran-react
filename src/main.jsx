import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import "./index.css";
import { QuranHome } from "./pages/QuranHome.jsx";
import { Surah } from "./pages/Surah.jsx";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import "./App.css";

const ScrollToSection = () => {
     const location = useLocation();

     useEffect(() => {
          if (location.hash) {
               const id = location.hash.substring(1);
               const element = document.getElementById(id);
               if (element) {
                    setTimeout(() => {
                         element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
               }
          }
     }, [location]);

     return null;
};

const router = createBrowserRouter([
     {
          path: "/",
          element: <QuranHome />,
     },
     {
          path: "/quran/:id",
          element: <Surah />,
     },
]);

const App = () => {
     const [theme, setTheme] = useState(() => {
          const storedTheme = localStorage.getItem("theme");
          return storedTheme ? storedTheme : "light";
     });
     useEffect(() => {
          if (typeof window !== "undefined") {
               if (theme === "dark") {
                    document.documentElement.classList.add("dark");
               } else {
                    document.documentElement.classList.remove("dark");
               }
          }
     }, [theme]);

     return (
          <ThemeProvider>
               <RouterProvider router={router}>
                    <ScrollToSection />
               </RouterProvider>
          </ThemeProvider>
     );
};

createRoot(document.getElementById("root")).render(
     <StrictMode>
          <App />
     </StrictMode>
);
