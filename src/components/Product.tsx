import type { Products, ProductLocalStorage, Units, CartItemType, Summary } from "../types"
import { IsPositive } from "../utilities/dataValidation";
import { Convert } from "../utilities/unitConversions"

type ProductProps = {
  product: Products
  productLS: ProductLocalStorage
  //HandleOnChangePhysicalUnit: (e: React.ChangeEvent<HTMLSelectElement>, setProductsLS: () => void) => void
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  //HandleOnChangeStoreProductUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void
  units: Units[]
  cart: CartItemType[]
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
  summary: Summary
}

export default function Product( { product, productLS, setProductsLS, units, cart, setCart, summary }: ProductProps ) {
  return (
    <>
      <section className="content_product-selection_products_product">
        <h3>{product.name}</h3>
        <img src={`/img/${product.img}`} alt={product.name} width={100} height={100} />
        <section className="content_product-selection_products_product_section">
          <h4>Quantity</h4>
          <div>
            <input type="text" value={productLS.productQuantity} onChange={(e)=>{
              const newValue = e.target.value
              if (IsPositive(newValue)) {
                setProductsLS(prev =>
                  prev.map(p=>
                    p.id === product.id ? { ...p, productQuantity: newValue } : p
                ));
              }
            }}/>
            <select name="unit" value={productLS.productUnit} onChange={(e)=>{
              const newValue = e.target.value
              setProductsLS(prev =>
                prev.map(p =>
                  p.id === product.id ? { ...p, productUnit: newValue } : p
                )
              );
            }}>
              <option disabled value="">----</option>
              { units.map( (e) => {
                if (e.name === productLS.physicalUnit) {
                  return Object.entries(e.units).map(([clave]) => <option key={clave} value={clave}>{clave}</option>)
                }
              }) }
            </select>
          </div>
        </section>
        <button className="add-button" onClick={()=>{
          if (!productLS.physicalUnit||!productLS.storeProductUnit||!productLS.productUnit) {
            return
          }
          if (!productLS.storeProductQuantity||!productLS.price||!productLS.productQuantity) {
            return
          }
          const convertedProductQuantity = Convert(productLS.physicalUnit, Number.parseFloat(productLS.productQuantity), productLS.productUnit, productLS.storeProductUnit)
          const newPrice = (Number.parseFloat(productLS.price)/Number.parseFloat(productLS.storeProductQuantity)*convertedProductQuantity)
          setCart(prev => {
            return [...prev, { id: prev.length, num: `${prev.length+1}`, name: `${productLS.name}`, img: `${productLS.img}`, quantity: `${productLS.productQuantity}`, quantityMultiplied: `${Number.parseFloat(productLS.productQuantity)*Number.parseFloat(summary.multiplier)}`, physicalUnit: productLS.physicalUnit, units: Object.entries(units.find(e => e.name === productLS.physicalUnit)?.units ?? []).map(([key]) => key), productUnit: productLS.productUnit, price: `${newPrice}`, priceMultiplied: `${newPrice*Number.parseFloat(summary.multiplier)}`}]
          })
        }}>Add To Cart</button>
      </section>
    </>
  )
}