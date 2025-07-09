type StoreProductProps = {
  product: Products
  productLS: ProductLocalStorage
  //HandleOnChangePhysicalUnit: (e: React.ChangeEvent<HTMLSelectElement>, setProductsLS: () => void) => void
  setProductsLS: React.Dispatch<React.SetStateAction<ProductLocalStorage[]>>,
  //HandleOnChangeStoreProductUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void
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

export default function StoreProduct( { product, productLS, setProductsLS, units }: StoreProductProps ) {

  return (
    <>
    <section className="">
      <h3>{product.name}</h3>
      <img src={`/img/${product.img}`} alt={product.name} width={100} height={100} />
      <section>
        <h4>Physical Unit</h4>
        <select name="physicalUnit" value={productLS.physicalUnit} onChange={(e)=>{
          const newValue = e.target.value
          setProductsLS(prev =>
            prev.map(p =>
              p.id === product.id ? { ...p, physicalUnit: newValue, storeProductUnit: "", productUnit: "" } : p
            )
          );
        }}>
          <option value="">Please choose an option</option>
          {product.physicalUnit.map((unit, index) => (
            <option key={index} value={unit}>{unit}</option>
          ))}
        </select>
      </section>
      <section>
        <h4>Quantity</h4>
        <input type="text" value={productLS.storeProductQuantity} onChange={(e)=>{
          const newValue = e.target.value
          setProductsLS(prev =>
            prev.map(p=>
              p.id === product.id ? { ...p, storeProductQuantity: newValue } : p
          ));
        }}/>
        <select name="unit" value={productLS.storeProductUnit} onChange={(e)=>{
          const newValue = e.target.value
          setProductsLS(prev =>
            prev.map(p =>
              p.id === product.id ? { ...p, storeProductUnit: newValue } : p
            )
          );
        }}>
          <option value="">Please choose an option</option>
          { units.map( (e) => {
            if (e.name === productLS.physicalUnit) {
              return Object.entries(e.units).map(([clave]) => <option key={clave} value={clave}>{clave}</option>)
            }
          }) }
        </select>
      </section>
      <section>
        <h4>Price</h4>
        <input type="text" value={productLS.price} onChange={(e)=>{
            const newValue = e.target.value
            setProductsLS(prev =>
              prev.map(p=>
                p.id === product.id ? { ...p, price: newValue } : p
            ));
          }}/>
      </section>
    </section>
    </>
  );
}