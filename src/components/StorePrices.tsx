import StoreProduct from "./StoreProduct"
import type { Products, ProductLocalStorage, Units } from "../types"

type StorePricesProp = {
  products: Products[],
  productsLS: ProductLocalStorage[],
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  units: Units[]
}

export default function StorePrices( {products, productsLS, setProductsLS, units} : StorePricesProp ) {
  return (
    <>
      <section className="content_store-prices">
        <h2>Store Prices</h2>
        <section className="content_store-prices_store-products">
          {products.map((product)=>{
            const productLS = productsLS.find(e => (e.id == product.id))
            if (!productLS) return null;
            return <StoreProduct
              key={product.id}
              product={product}
              productLS={productLS}
              setProductsLS={setProductsLS}
              units={units}
            ></StoreProduct>
          })}
        </section>
      </section>
    </>
  )
}