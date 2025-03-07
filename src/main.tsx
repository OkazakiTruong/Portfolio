import ReactDOM from "react-dom/client";
import Router from "./config/Router";
import "./index.css";
import "./i18n";
import { ThemeProvider } from "./context/ThemeProvider"; // Import component mới

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);
