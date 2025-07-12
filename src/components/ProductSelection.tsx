import Product from "./Product"

type ProductSelectionProp = {
  products: Products[],
  productsLS: ProductLocalStorage[],
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  units: Units[]
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>,
}

export default function ProductSelection( {products, productsLS, setProductsLS, units, cart, setCart} : ProductSelectionProp ) {
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
            ></Product>
          })}
        </section>
      </section>
    </>
  )
}