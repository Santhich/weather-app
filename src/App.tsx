// src/App.tsx
import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Home from "./components/Home"; // replace with your main component

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 7500); // start fade
    const doneTimer = setTimeout(() => setLoading(false), 8000); // end loading

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {loading ? <Preloader fadeOut={fadeOut} /> : <Home />}
    </>
  );
};

export default App;
