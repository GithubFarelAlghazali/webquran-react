import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QuranHome } from "./pages/QuranHome.jsx";
import { Jadwal } from "./pages/Jadwal.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Surah } from "./pages/Surah.jsx";

const router = createBrowserRouter([
     {
          path: "/",
          element: <QuranHome />,
     },

     {
          path: "/quran/:id",
          element: <Surah />,
     },
     {
          path: "/jadwal",
          element: <Jadwal />,
     },
]);

createRoot(document.getElementById("root")).render(
     <StrictMode>
          <RouterProvider router={router} />
     </StrictMode>
);
