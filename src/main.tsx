import { createRoot } from "react-dom/client";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);

// Strip the Vite base path so routing works both locally and on GitHub Pages
const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // e.g. "" or "/Physical-Netwoking"
const path = window.location.pathname.replace(base, "") || "/";

if (path === "/library" || path.startsWith("/library/")) {
  import("./library/LibraryApp").then(({ LibraryApp }) => {
    root.render(<LibraryApp />);
  });
} else {
  import("./app/App").then(({ default: App }) => {
    root.render(<App />);
  });
}
