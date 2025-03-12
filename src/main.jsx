import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import "./index.css";
import { QuranHome } from "./pages/QuranHome.jsx";
import { Jadwal } from "./pages/Jadwal.jsx";
import { Surah } from "./pages/Surah.jsx";
import "./App.css";

// Component to handle hash scrolling
const ScrollToSection = () => {
     const location = useLocation();

     useEffect(() => {
          if (location.hash) {
               const id = location.hash.substring(1); // Remove #
               const element = document.getElementById(id);
               if (element) {
                    setTimeout(() => {
                         element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100); // Delay to ensure the element is rendered
               }
          }
     }, [location]);

     return null;
};

// Define routes
const router = createBrowserRouter([
     {
          path: "/",
          element: (
               <>
                    <ScrollToSection />
                    <QuranHome />
               </>
          ),
     },
     {
          path: "/quran/:id",
          element: (
               <>
                    <ScrollToSection />
                    <Surah />
               </>
          ),
     },
     {
          path: "/jadwal",
          element: (
               <>
                    <ScrollToSection />
                    <Jadwal />
               </>
          ),
     },
]);

const App = () => {
     const [theme, setTheme] = useState(() => {
          if (typeof window !== "undefined") {
               return localStorage.getItem("theme") || "light";
          }
          return "light";
     });

     useEffect(() => {
          if (typeof window !== "undefined") {
               document.documentElement.classList.toggle("dark", theme === "dark");
          }
     }, [theme]);

     useEffect(() => {
          const storedTheme = localStorage.getItem("theme");
          if (storedTheme) {
               setTheme(storedTheme);
          }
     }, []);

     return (
          <>
               <ScrollToSection />
               <RouterProvider router={router} />
          </>
     );
};

// Render application
createRoot(document.getElementById("root")).render(
     <StrictMode>
          <RouterProvider router={router} />
     </StrictMode>
);
