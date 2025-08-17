import { useStore } from "../store/useStore";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { getDisplayAmount, stringToNumberWithoutEmpty } from "../helpers/dataValidation";
import { useMemo, useRef } from "react";

type CartProps = {
}

export default function Cart({} : CartProps) {

  const {
    cart,
    removeItemFromCart,
    cartMultiplier,
    setCartMultiplier,
    setProductSelectionAmountUnit,
    cartQuantityProduced,
    setCartQuantityProduced,
    cartSellingPricePerUnit,
    setCartSellingPricePerUnit,
    options,
    downloadCurrentCart,
    uploadCart,
  } = useStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // simular click en input hidden
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCart(file); // usar la acción del store
      e.target.value = ""
    }
  };

  function multiplyValue(value: number, multiplier: number) : number {
    return value*multiplier
  }

  function AddCurrencySymbol(text: string) {
    return options.currencySymbol+". "+text
  }

  const totalCost = useMemo(()=>((cart.reduce((total, n) => total + n.finalPrice ,0))*cartMultiplier),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  const costPerUnit = useMemo(()=>(totalCost/cartQuantityProduced),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  const profitPerUnit = useMemo(()=>(cartSellingPricePerUnit-costPerUnit),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  const profitPercent = useMemo(()=>(profitPerUnit / costPerUnit * 100),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  const totalProfit = useMemo(()=>(profitPerUnit * cartQuantityProduced),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  const totalSellingPrice = useMemo(()=>(cartQuantityProduced * cartSellingPricePerUnit),[cart,cartQuantityProduced,cartSellingPricePerUnit,cartMultiplier])
  
  return (
    <>
      <section className="content_cart">
        <section className="content_cart_items">
          <h2>Cart</h2>
          { cart.length ?
          <div className="content_cart_items_section">
            <div className="content_cart_items_section_multiplier">
              <h3>Multiplier</h3>
              <input
                type="text"
                value={getDisplayAmount(cartMultiplier)}
                onChange={(e)=>{setCartMultiplier(stringToNumberWithoutEmpty(e.target.value))}}  
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>img</th>
                  <th>quantity</th>
                  <th>unit</th>
                  <th>price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => {
                  return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.name}</td>
                    <td><img src={`/img/${item.img}`} alt={item.name} width={50} height={50} /></td>
                    <td>{multiplyValue(item.product_selection_amount, cartMultiplier).toFixed(5)}</td>
                    <td>
                      <select
                        value={item.product_selection_amount_unit}
                        onChange={(e)=>{setProductSelectionAmountUnit(item.id,e.target.value)}}
                      >
                        { item.amount_units.map( (u,j) => (
                          <option key={j} value={u}>{u}</option>
                        )) }
                      </select>
                    </td>
                    <td>{AddCurrencySymbol(multiplyValue(item.finalPrice, cartMultiplier).toFixed(5))}</td>
                    <td><button
                      className="remove-button"
                      onClick={()=>{removeItemFromCart(item.id)}}
                    >Remove</button></td>
                  </tr>)
                })}
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{AddCurrencySymbol(totalCost.toFixed(5))}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          : <h3>The cart is empty</h3>}
        </section>
        <section className="content_cart_summary">
          <h2>Summary</h2>
          <section>
            <h3>Quantity produced</h3>
            <div>
              <input
                type="number"
                value={getDisplayAmount(cartQuantityProduced)}
                onChange={(e)=>{setCartQuantityProduced(stringToNumberWithoutEmpty(e.target.value))}}
              />
              <p>units</p>
            </div>
          </section>
          <section>
            <h3>Selling price per unit</h3>
            <div>
              <input
                type="number"
                value={getDisplayAmount(cartSellingPricePerUnit)}
                onChange={e=>{setCartSellingPricePerUnit(stringToNumberWithoutEmpty(e.target.value))}}
              />
              <p>{options.currencySymbol}</p>
            </div>
          </section>
          <section className="content_cart_summary_cost-per-unit">
            <h3>Cost per unit:</h3>
            <p>{AddCurrencySymbol(costPerUnit.toFixed(5))}</p>
          </section>
          <section className="content_cart_summary_profit-per-unit">
            <h3>Profit per unit:</h3>
            <p>{AddCurrencySymbol(profitPerUnit.toFixed(5))}</p>
          </section>
          <section className="content_cart_summary_profit-percent">
            <h3>Profit %:</h3>
            <p>{profitPercent.toFixed(5)} %</p>
          </section>
          <section className="content_cart_summary_total-cost">
            <h3>Total cost:</h3>
            <p>{AddCurrencySymbol(totalCost.toFixed(5))}</p>
          </section>
          <section className="content_cart_summary_total-profit">
            <h3>Total profit:</h3>
            <p>{AddCurrencySymbol(totalProfit.toFixed(5))}</p>
          </section>
          <section className="content_cart_summary_total-selling-price">
            <h3>Total selling price:</h3>
            <p>{AddCurrencySymbol(totalSellingPrice.toFixed(5))}</p>
          </section>
        </section>
        <section className="content_cart_upload">
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            Upload cart (JSON)
            <ArrowUpTrayIcon />
          </button>
        </section>
        <section className="content_cart_download">
          <button 
            onClick={()=>{downloadCurrentCart()}}
          >
            Download Current Cart
            <ArrowDownTrayIcon />
          </button>
        </section>
      </section>
    </>
  )
}