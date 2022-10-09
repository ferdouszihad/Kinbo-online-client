import "./App.css";
import Header from "./pages/Shared/Header/Header";
import Footer from "./pages/Shared/Footer/Footer";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

    fetch("data.json")
    .then((res) => res.json())
    .then((data) => setProducts(data));
   
  return (
    <div className=" ">
    
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}

export default App;
