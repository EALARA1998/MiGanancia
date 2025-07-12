import { Convert } from "../assets/utilities/unitConversions"

type CartProps = {
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
}

export default function Cart({ cart, setCart } : CartProps) {
  return (
    <>
      <section className="content_cart">
        <h2>Cart</h2>
        { cart.length ?
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
                <td>{Number.parseFloat(item.quantity).toFixed(5)}</td>
                <td>
                    <select value={item.productUnit} onChange={(e) => {
                      const newUnit = e.target.value;
                      const newValue = Convert(item.physicalUnit, Number.parseFloat(item.quantity), item.productUnit, newUnit).toString()
                      setCart(prev => {
                        return prev.map(cartItem => {
                          if (cartItem.id === item.id) {
                            return { ...cartItem, productUnit: newUnit, quantity: newValue };
                          }
                          return cartItem;
                        });
                      });
                    }}>
                      <option value="">----</option>
                      { item.units.map((e, i) => <option key={i} value={e}>{e}</option>) }
                    </select>
                </td>
                <td>{item.price}</td>
                <td><button onClick={()=>{
                  setCart(prev => {
                    const filtered = prev.filter(e => e.id !== item.id)
                    const reindexed = filtered.map((e, i) => ({ ...e, num: `${i+1}` }))
                    return reindexed
                  })
                }}>Remove</button></td>
              </tr>
            })}
          </tbody>
        </table>
        : <h3>The cart is empty</h3>}
      </section>
    </>
  )
}