import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyDesign } from "./lib/design";
import "./styles/global.css";

applyDesign();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
