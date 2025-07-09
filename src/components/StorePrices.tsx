import StoreProduct from "./StoreProduct"

type StorePricesProp = {
  products: Products[],
  productsLS: ProductLocalStorage[],
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  units: Units[]
}
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

export default function StorePrices( {products, productsLS, setProductsLS, units} : StorePricesProp ) {
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
            setProductsLS={setProductsLS}
            units={units}
          ></StoreProduct>
        })}
      </section>
    </>
  )
}