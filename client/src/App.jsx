import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./core/components/layout/Header";
import Footer from "./core/components/layout/Footer";
import Landing from "./core/components/layout/Landing";
import RootRouter from "./RootRouter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <RootRouter />
      <Footer />
    </>
  );
}

export default App;
