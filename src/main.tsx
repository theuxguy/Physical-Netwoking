import { createRoot } from "react-dom/client";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);
const path = window.location.pathname;

if (path === "/library" || path.startsWith("/library/")) {
  import("./library/LibraryApp").then(({ LibraryApp }) => {
    root.render(<LibraryApp />);
  });
} else {
  import("./app/App").then(({ default: App }) => {
    root.render(<App />);
  });
}
