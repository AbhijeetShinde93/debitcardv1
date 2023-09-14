import React, { useState } from "react";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import DebitCard from "./componends/DebitCard/DebitCard";

function App() {
  const [clor, setClor] = useState("#c1c1c1");

  const appColorBg = (bgClor) => {
    setClor(bgClor);
  };

  return (
    <div className="App" style={{ backgroundColor: clor }}>
      <DebitCard appColorBg={setClor} />
    </div>
  );
}

export default App;
