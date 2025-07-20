import Product from "./Product"
import type { Products, ProductLocalStorage, Units, CartItemType, Summary } from "../types"

type ProductSelectionProp = {
  products: Products[],
  productsLS: ProductLocalStorage[],
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  units: Units[]
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>,
  summary: Summary
}

export default function ProductSelection( {products, productsLS, setProductsLS, units, cart, setCart, summary} : ProductSelectionProp ) {
  return (
    <>
      <section className="content_product-selection">
        <h2>Products Selection</h2>
        <section className="content_product-selection_products">
          {products.map((product)=>{
            const productLS = productsLS.find(e => (e.id == product.id))
            if (!productLS) return null;
            return <Product
              key={product.id}
              product={product}
              productLS={productLS}
              setProductsLS={setProductsLS}
              units={units}
              setCart={setCart}
              cart={cart}
              summary={summary}
            ></Product>
          })}
        </section>
      </section>
    </>
  )
}