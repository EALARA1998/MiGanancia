import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import productsJson from "./assets/data/products.json"
import unitsJson from "./assets/data/units.json"
import StorePrices from "./components/StorePrices";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Home from "./components/Home";

type Products = {
  id: number,
  name: string,
  img: string,
  physicalUnit: string[]
}
type ProductLocalStorage = {
  id: number,
  name: string,
  physicalUnit: string,
  storeProductQuantity: string,
  storeProductUnit: string,
  price: string,
  productQuantity: string,
  productUnit: string,
}
type Units = {
  name: string,
  units: Unit[]
}
type Unit = {
  [ unitName: string ] : string
}

export default function App() {

  const [products, setProducts] = useState(productsJson as unknown as Products[])
  const [productsLS, setProductsLS] = useState([] as ProductLocalStorage[])
  const [units, setUnits] = useState(unitsJson as unknown as Units[])

  useEffect(()=>{
    setProductsLS(products.map((product)=>{
      return { id: product.id, name: product.name, physicalUnit: "", storeProductQuantity: "", storeProductUnit: "", price: "", productQuantity: "", productUnit: "" }
    }))
  },[])

  useEffect(()=>{
    console.log(productsLS)
  },[productsLS])

  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/store_prices">StorePrices</Link>
          <Link to="/product_selection">ProductSelection</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/store_prices" element={<StorePrices products={products} productsLS={productsLS} setProductsLS={setProductsLS} units={units}></StorePrices>} />
          <Route path="/product_selection" element={<ProductSelection products={products} productsLS={productsLS} setProductsLS={setProductsLS} units={units}></ProductSelection>} />
          <Route path="/cart" element={<Cart></Cart>} />
        </Routes>
      </Router>
    </>
  )
}