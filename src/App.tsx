import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import type { Units } from "./types"
//import productsJson from "./assets/data/products.json"
import unitsJson from "./assets/data/units.json"
import StorePrices from "./components/StorePrices";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Fuel from "./components/Fuel";
import useProductsLS from "./hooks/useProductsLS";
import useCart from "./hooks/useCart";
import useFuel from "./hooks/useFuels";
import useSummary from "./hooks/useSummary";

export default function App() {
  
  //const [products, setProducts] = useState<Products[]>(productsJson as unknown as Products[])
  const [units] = useState<Units[]>(unitsJson as unknown as Units[])
  
  const {productsLS, setProductsLS, products} = useProductsLS()
  
  const {cart, setCart} = useCart()

  const {fuel, setFuel} = useFuel()

  const {summary, setSummary} = useSummary()
  
  useEffect(() => {
    const totalCost = cart.reduce((total, e) => total + Number.parseFloat(e.priceMultiplied), 0);
    const quantityProduced = Number.parseFloat(summary.quantityProduced);
    const sellingPricePerUnit = Number.parseFloat(summary.sellingPricePerUnit);
    const costPerUnit = totalCost / quantityProduced
    const profitPerUnit = sellingPricePerUnit - costPerUnit
    const profitPercent = profitPerUnit / costPerUnit * 100
    const totalProfit = profitPerUnit * quantityProduced
    const totalSellingPrice = quantityProduced * sellingPricePerUnit
    setSummary(prev => ({
      ...prev,
      totalItems: cart.length.toString(),
      totalCost: totalCost.toString(),
      costPerUnit: costPerUnit.toString(),
      profitPerUnit: profitPerUnit.toString(),
      profitPercent: profitPercent.toString(),
      totalProfit: totalProfit.toString(),
      totalSellingPrice: totalSellingPrice.toString()
    }))

  }, [cart, summary.quantityProduced, summary.sellingPricePerUnit]);
  useEffect(()=>{
    const multiplier = Number.parseFloat(summary.multiplier)
    const multipliedCart = cart.map(item=>{
      if (!(item.name === "Electricity")) {
        return { ...item, priceMultiplied: `${Number.parseFloat(item.price)*multiplier}`, quantityMultiplied: `${Number.parseFloat(item.quantity)*multiplier}` }
      }else{
        return { ...item }
      }
    })
    setCart(multipliedCart)
    // setSummary(prev => {
    //   return { ...prev, quantityProduced: `${Number.parseFloat(prev.quantityProduced) * multiplier}`}
    // })
  },[summary.multiplier])
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/store-prices">StorePrices</Link>
          <Link to="/product-selection">ProductSelection</Link>
          <Link to="/fuel">Fuel</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/store-prices" element={<StorePrices products={products} productsLS={productsLS} setProductsLS={setProductsLS} units={units}></StorePrices>} />
          <Route path="/product-selection" element={<ProductSelection products={products} productsLS={productsLS} setProductsLS={setProductsLS} units={units} cart={cart} setCart={setCart} summary={summary}></ProductSelection>} />
          <Route path="/fuel" element={<Fuel units={units} fuel={fuel} setFuel={setFuel} setCart={setCart} summary={summary}></Fuel>} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} summary={summary} setSummary={setSummary}></Cart>} />
        </Routes>
      </Router>
    </>
  )
}