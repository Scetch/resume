import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Resume from "./Resume/Resume";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Resume />
  </React.StrictMode>
);
