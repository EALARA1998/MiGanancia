import type { CartItemType, Summary } from "../types";
import { Convert } from "../assets/utilities/unitConversions"
import { IsPositive, IsNumeric } from "../assets/utilities/dataValidation";

type CartProps = {
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
  summary: Summary
  setSummary: React.Dispatch<React.SetStateAction<Summary>>
}

export default function Cart({ cart, setCart, summary, setSummary } : CartProps) {
  return (
    <>
      <section className="content_cart">
        <section className="content_cart_items">
          <h2>Cart</h2>
          { cart.length ?
          <div className="content_cart_items_section">
            <div className="content_cart_items_section_multiplier">
              <h3>Multiplier</h3>
              <input type="text" value={summary.multiplier} onChange={e=>{
                const newValue = e.target.value
                if (IsPositive(newValue)) {
                  setSummary(prev => {
                    return { ...prev, multiplier: `${newValue}`}
                  })
                }
              }}/>
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
                {cart.map(item => {
                  return <tr key={item.num}>
                    <td>{item.num}</td>
                    <td>{item.name}</td>
                    <td><img src={`/img/${item.img}`} alt={item.name} width={50} height={50} /></td>
                    <td>{Number.parseFloat(item.quantityMultiplied).toFixed(5)}</td>
                    <td>
                        <select value={item.productUnit} onChange={(e) => {
                          const newUnit = e.target.value;
                          const newValueQuantityMultiplied = Convert(item.physicalUnit, Number.parseFloat(item.quantityMultiplied), item.productUnit, newUnit).toString()
                          const newValueQuantity = Convert(item.physicalUnit, Number.parseFloat(item.quantity), item.productUnit, newUnit).toString()
                          setCart(prev => {
                            return prev.map(cartItem => {
                              if (cartItem.id === item.id) {
                                return { ...cartItem, productUnit: newUnit, quantityMultiplied: newValueQuantityMultiplied, quantity: newValueQuantity };
                              }
                              return cartItem;
                            });
                          });
                        }}>
                          <option value="" disabled>----</option>
                          { item.units.map((e, i) => <option key={i} value={e}>{e}</option>) }
                        </select>
                    </td>
                    <td>{Number.parseFloat(item.priceMultiplied).toFixed(3)}</td>
                    <td><button className="remove-button" onClick={()=>{
                      setCart(prev => {
                        const filtered = prev.filter(e => e.id !== item.id)
                        const reindexed = filtered.map((e, i) => ({ ...e, num: `${i+1}` }))
                        return reindexed
                      })
                    }}>Remove</button></td>
                  </tr>
                })}
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{Number.parseFloat(summary.totalCost).toFixed(3)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          : <h3>The cart is empty</h3>}
        </section>
        <section className="content_cart_summary">
          <h2>Summary</h2>
          <section className="content_cart_summary_section">
            <h3>Quantity produced</h3>
            <input type="text" value={summary.quantityProduced} onChange={(e)=>{
              const newValue = e.target.value
              if (IsNumeric(newValue)) {
                setSummary(prev => {
                  return { ...prev, quantityProduced: newValue}
                })
              }
            }}/>
          </section>
          <section className="content_cart_summary_section">
            <h3>Selling price per unit</h3>
            <input type="text" value={summary.sellingPricePerUnit} onChange={e=>{
              const newValue = e.target.value
              if (IsNumeric(newValue)) {
                setSummary(prev => {
                  return { ...prev, sellingPricePerUnit: newValue}
                })
              }
            }}/>
          </section>
          <section className="content_cart_summary_section">
            <h3>Cost per unit:</h3>
            <p>{summary.costPerUnit}</p>
          </section>
          <section className="content_cart_summary_section">
            <h3>Profit per unit:</h3>
            <p>{summary.profitPerUnit}</p>
          </section>
          <section className="content_cart_summary_section">
            <h3>Profit %:</h3>
            <p>{summary.profitPercent}</p>
          </section>
          <section className="content_cart_summary_section">
            <h3>Total cost:</h3>
            <p>{summary.totalCost}</p>
          </section>
          <section className="content_cart_summary_section">
            <h3>Total profit:</h3>
            <p>{summary.totalProfit}</p>
          </section>
          <section className="content_cart_summary_section">
            <h3>Total selling price:</h3>
            <p>{summary.totalSellingPrice}</p>
          </section>
        </section>
      </section>
    </>
  )
}