import { useStore } from "../store/useStore"
import { useForm } from "react-hook-form"
import { getDisplayAmount, stringToNumberWithoutEmpty } from "../helpers/dataValidation"

type FormValues = {
  store_prices: {
    physical_unit: number
    amount: number
    amount_unit: string
    price: number
  }[]
}

type StorePricesProp = {

}

export default function StorePrices( {} : StorePricesProp ) {

  const { products, storePricesForm, setStorePrices, units } = useStore()

  const { register } = useForm<FormValues>()

  // const addToStorePrices = (i: number) => {
  //   const machineData = getValues(`store_prices.${i}`); // solo datos de esa máquina
  //   const machineInfo = products[i]; // datos del JSON

  //   const item = {
  //     ...machineInfo,
  //     ...machineData,
  //   };

  //   console.log("Añadido al carrito:", item);
  //   // Aquí podrías setear un estado global o llamar a un backend
  // };

  return (
    <>
      <section className="content_store-prices">
        <h2>Store Prices</h2>
        <section className="content_store-prices_store-products">
          {products.map((product, i)=>{
            const storePricesData = storePricesForm[i] || {
              physical_unit: "",
              amount: 0,
              amount_unit: "",
              price: 0,
            };
            return (
            <section
              key={i}
              className="content_store-prices_store-products_store-product">
              <h3>{product.name}</h3>
              <img src={`/img/${product.img}`} alt={product.name} />
              <section>
                <label htmlFor={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_physical_unit`}>Physical Unit</label>
                <select
                  {...register(`store_prices.${i}.physical_unit`)}
                  id={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_physical_unit`}
                  value={storePricesData.physical_unit}
                  onChange={(e)=>{setStorePrices(i,"physical_unit",e.target.value)}}
                >
                  <option disabled value="">----</option>
                  {product.physical_units.map((unit, j) => (
                    <option key={j} value={unit}>{unit}</option>
                  ))}
                </select>
              </section>
              <section>
                <label htmlFor={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_amount`}>Amount</label>
                <div>
                  <input
                    {...register(`store_prices.${i}.amount`)}
                    id={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_amount`}
                    type="number"
                    value={getDisplayAmount(storePricesData.amount)}
                    onChange={(e)=>{setStorePrices(i,"amount",stringToNumberWithoutEmpty(e.target.value))}}
                    />
                  <select
                    {...register(`store_prices.${i}.amount_unit`)}
                    name="unit"
                    value={storePricesData.amount_unit}
                    onChange={(e)=>{setStorePrices(i,"amount_unit",e.target.value)}}
                  >
                    <option disabled value="">----</option>
                    { units.map( (e) => {
                      if (e.name === storePricesData.physical_unit) {
                        return Object.entries(e.units).map(([clave]) => <option key={clave} value={clave}>{clave}</option>)
                      }
                    }) }
                  </select>
                </div>
              </section>
              <section>
                <label htmlFor={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_price`}>Price</label>
                <input
                  id={`${product.name.toLowerCase().replace(/\s+/g, '_')}_store_prices_price`}
                  type="number"
                  value={getDisplayAmount(storePricesData.price)}
                  onChange={(e)=>{setStorePrices(i,"price",stringToNumberWithoutEmpty(e.target.value))}}
                />
              </section>
            </section>
          )})}
        </section>
      </section>
    </>
  )
}