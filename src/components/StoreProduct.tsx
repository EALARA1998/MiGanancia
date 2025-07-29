import { IsPositive } from "../utilities/dataValidation";
import type { Products, ProductLocalStorage, Units } from "../types"

type StoreProductProps = {
  product: Products
  productLS: ProductLocalStorage
  //HandleOnChangePhysicalUnit: (e: React.ChangeEvent<HTMLSelectElement>, setProductsLS: () => void) => void
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  //HandleOnChangeStoreProductUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void
  units: Units[]
}

export default function StoreProduct( { product, productLS, setProductsLS, units }: StoreProductProps ) {

  return (
    <>
    <section className="content_store-prices_store-products_store-product">
      <h3>{product.name}</h3>
      <img src={`/img/${product.img}`} alt={product.name} width={100} height={100} />
      <section className="content_store-prices_store-products_store-product_section">
        <h4>Physical Unit</h4>
        <select name="physicalUnit" value={productLS.physicalUnit} onChange={(e)=>{
          const newValue = e.target.value
          setProductsLS(prev =>
            prev.map(p =>
              p.id === product.id ? { ...p, physicalUnit: newValue, storeProductUnit: "", productUnit: "" } : p
            )
          );
        }}>
          <option disabled value="">----</option>
          {product.physicalUnit.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
      </section>
      <section className="content_store-prices_store-products_store-product_section">
        <h4>Quantity</h4>
        <div>
          <input type="text" value={productLS.storeProductQuantity} onChange={(e)=>{
            const newValue = e.target.value
            if (IsPositive(newValue)) {
              setProductsLS(prev =>
                prev.map(p=>
                  p.id === product.id ? { ...p, storeProductQuantity: newValue } : p
              ));
            }
          }}/>
          <select name="unit" value={productLS.storeProductUnit} onChange={(e)=>{
            const newValue = e.target.value
            setProductsLS(prev =>
              prev.map(p =>
                p.id === product.id ? { ...p, storeProductUnit: newValue } : p
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
      <section className="content_store-prices_store-products_store-product_section">
        <h4>Price</h4>
        <input type="text" value={productLS.price} onChange={(e)=>{
            const newValue = e.target.value
            if (IsPositive(newValue)) {
              setProductsLS(prev =>
                prev.map(p=>
                  p.id === product.id ? { ...p, price: newValue } : p
              ));
            }
          }}/>
      </section>
    </section>
    </>
  );
}