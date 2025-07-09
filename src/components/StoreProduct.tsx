import { useState, useEffect } from "react"
import unitsJson from "../assets/data/units.json"

type StoreProductProps = {
  product: Products
  productLS: ProductLocalStorage
  HandleOnChangePhysicalUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void
  HandleOnChangeStoreProductUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
type Products = {
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

export default function StoreProduct( { product, productLS, HandleOnChangePhysicalUnit, HandleOnChangeStoreProductUnit }: StoreProductProps ) {

  const [units, setUnits] = useState(unitsJson as unknown as Units[])
  
  useEffect(()=>{

  },[])

  return (
    <>
    <section className="">
      <h3>{product.name}</h3>
      <img src={`/img/${product.img}`} alt={product.name} width={100} height={100} />
      <section>
        <h4>Physical Unit</h4>
        <select name="physicalUnit" value={productLS.physicalUnit} onChange={HandleOnChangePhysicalUnit}>
          <option value="">Please choose an option</option>
          {product.physicalUnit.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
      </section>
      <section>
        <h4>Quantity</h4>
        <input type="text" />
        <select name="unit" value={productLS.storeProductUnit} onChange={HandleOnChangeStoreProductUnit}>
          <option value="">Please choose an option</option>
          { units.map( (e) => {
            if (e.name === productLS.physicalUnit) {
              return Object.entries(e.units).map(([clave]) => <option key={clave} value={clave}>{clave}</option>)
            }
          }) }
        </select>
      </section>
    </section>
    </>
  );
}