import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // ← ThemeProvider, NOT ThemeContext

createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider>   {/* ← ThemeProvider, NOT ThemeContext */}
      <App />
    </ThemeProvider>
    <ToastContainer position="top-right" theme="colored" autoClose={2000} />
  </>
);
