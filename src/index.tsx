import React from "react";
import { createRoot } from "react-dom/client";

import "./App.css";
import App from "./App";
import { ThemeProvider } from "./providers/theme";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
