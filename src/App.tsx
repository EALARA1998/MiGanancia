import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StorePrices from "./components/StorePrices";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Machines from "./components/Machines";

export default function App() {

  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/store-prices">Store Prices</Link>
          <Link to="/product-selection">Product Selection</Link>
          <Link to="/machines">Machines</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <Routes>
          <Route 
            path="/" 
            element={<Home />} />
          <Route 
            path="/store-prices" 
            element={<StorePrices />} />
          <Route 
            path="/product-selection" 
            element={<ProductSelection />} />
          <Route 
            path="/machines"
            element={<Machines />} />
          <Route 
            path="/cart"
            element={<Cart></Cart>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}