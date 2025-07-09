import Product from "./Product"

type ProductSelectionProp = {
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

export default function ProductSelection( {products, productsLS, setProductsLS, units} : ProductSelectionProp ) {
  return (
    <>
      <section>
        <h2>Products Selection</h2>
        {products.map((product)=>{
          const productLS = productsLS.find(e => (e.id == product.id))
          if (!productLS) return null;
          return <Product
            key={product.id}
            product={product}
            productLS={productLS}
            setProductsLS={setProductsLS}
            units={units}
          ></Product>
        })}
      </section>
    </>
  )
}