import { useState, useEffect, useMemo } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import productsJson from "./assets/data/products.json"
import unitsJson from "./assets/data/units.json"
import StorePrices from "./components/StorePrices";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Fuel from "./components/Fuel";

export default function App() {
  
  const [products, setProducts] = useState(productsJson as unknown as Products[])
  const [units, setUnits] = useState(unitsJson as unknown as Units[])
  
  function InitialProductLS() {
    const localStorageProductLS = localStorage.getItem("productLS")
    if (!localStorageProductLS) {
      return (products.map((product)=>{
        return { 
          id: product.id,
          name: product.name,
          img: product.img,
          physicalUnit: "",
          storeProductQuantity: "",
          storeProductUnit: "",
          price: "",
          productQuantity: "",
          productUnit: ""
        }
      }))
    }else{
      return JSON.parse(localStorageProductLS)
    }
  }
  const [productsLS, setProductsLS] = useState(InitialProductLS() as ProductLocalStorage[])
  useEffect(()=>{
    localStorage.setItem("productLS", JSON.stringify(productsLS))
  },[productsLS])
  
  function InitialCart() {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [cart, setCart] = useState(InitialCart() as CartItemType[])
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

  function InitialFuel() {
    const localStorageFuel = localStorage.getItem("fuel")
    if (!localStorageFuel) {
      return {
        powerConsumptionElectricity: "1.5",
        powerConsumptionElectricityUnit: "kW",
        priceElectricity: "6.4031",
        priceElectricityUnit: "kW/h",
        timeElectricity: "",
        timeElectricityUnit: "min",
      }
    }else{
      return JSON.parse(localStorageFuel)
    }
  }
  const [fuel, setFuel] = useState(InitialFuel() as Fuel)
  useEffect(()=>{
    localStorage.setItem("fuel", JSON.stringify(fuel))
    console.log(fuel)
  },[fuel])
  
  
  function InitialSummary() {
    const localStorageSummary = localStorage.getItem("summary")
    if (!localStorageSummary) {
      return {
        multiplier: "1",
        totalItems: "",
        quantityProduced: "",
        sellingPricePerUnit: "",
        costPerUnit: "",
        profitPerUnit: "",
        profitPercent: "",
        totalCost: "",
        totalProfit: "",
        totalSellingPrice: ""
      }
    }else{
      return JSON.parse(localStorageSummary)
    }
  }
  const [summary, setSummary] = useState(InitialSummary() as Summary)
  useEffect(()=>{
    localStorage.setItem("summary", JSON.stringify(summary))
  },[summary])
  
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