import { useState, useEffect } from "react"
import productsJson from "./assets/data/products.json"
import StoreProduct from "./components/StoreProduct"

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


export default function App() {

  const [products, setProducts] = useState(productsJson as unknown as Products[])
  const [productsLS, setProductsLS] = useState([] as ProductLocalStorage[])


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
      <section>
        <h2>Store Prices</h2>
        {products.map((product)=>{
          const productLS = productsLS.find(e => (e.id == product.id))
          if (!productLS) return null;
          return <StoreProduct
            key={product.id}
            product={product}
            productLS={productLS}
            HandleOnChangePhysicalUnit={(event)=>{
              const newValue = event.target.value
              setProductsLS(prev =>
                prev.map(p =>
                  p.id === product.id ? { ...p, physicalUnit: newValue, storeProductUnit: "" } : p
                )
              );
            }}
            HandleOnChangeStoreProductUnit={(event)=>{
              const newValue = event.target.value
              setProductsLS(prev =>
                prev.map(p =>
                  p.id === product.id ? { ...p, storeProductUnit: newValue } : p
                )
              );
            }}
          ></StoreProduct>
        })}
      </section>
      <section>
        <h2>Products Quantity</h2>
      </section>
      <section>
        <h2>Cart</h2>
      </section>
    </>
  )
}