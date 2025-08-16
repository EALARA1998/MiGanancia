import type { CartItemDraft } from "../types"
import { useStore } from "../store/useStore"
import { useForm } from "react-hook-form"
import { getDisplayAmount, stringToNumberWithoutEmpty } from "../helpers/dataValidation"

type FormValues = {
  product_selection: {
    amount: number
    amount_unit: string
  }[]
}

type ProductSelectionProp = {
}

export default function ProductSelection( {} : ProductSelectionProp ) {

  const { products, units, storePricesForm, productSelectionForm, setProductSelection, addProductToCart } = useStore()

  const { register } = useForm<FormValues>()

  const processData = (i: number) => {

    const productInfo = products[i]
    const { name, img } = productInfo
    const productSelectionFormInfo = productSelectionForm[i]
    const storePricesFormInfo = storePricesForm[i]

    const amount_units = units.flatMap((e) => {
      if (e.name === storePricesForm[i].physical_unit) {
        return Object.keys(e.units);
      }
      return [];
    });

    const cartItem: CartItemDraft = {
      name: name,
      img: img,
      physical_unit: storePricesFormInfo.physical_unit,
      store_prices_amount: storePricesFormInfo.amount,
      store_prices_amount_unit: storePricesFormInfo.amount_unit,
      product_selection_amount: productSelectionFormInfo.amount,
      product_selection_amount_unit: productSelectionFormInfo.amount_unit,
      amount_units: amount_units,
      store_prices_price: storePricesFormInfo.price
    }

    addProductToCart(cartItem)
  };

  return (
    <>
      <section className="content_product-selection">
        <h2>Products Selection</h2>
        <section className="content_product-selection_products">
          {products.map((product, i)=>{
            const productSelectionData = productSelectionForm[i] || {
              amount: 0,
              amount_unit: ""
            };
            return (
            <section
              key={i}
              className="content_product-selection_products_product">
              <h3>{product.name}</h3>
              <img src={`/img/${product.img}`} alt={product.name} />
              <section>
                <label
                  htmlFor={`${product.name.toLowerCase().replace(/\s+/g, '_')}_product_selection_amount`}
                >Amount</label>
                <div>
                  <input
                    {...register(`product_selection.${i}.amount`)}
                    id={`${product.name.toLowerCase().replace(/\s+/g, '_')}_product_selection_amount`}
                    type="number" 
                    value={getDisplayAmount(productSelectionData.amount)}
                    onChange={(e)=>{setProductSelection(i,"amount",stringToNumberWithoutEmpty(e.target.value))}}
                    />
                  <select
                    {...register(`product_selection.${i}.amount_unit`)}
                    value={productSelectionData.amount_unit}
                    onChange={(e)=>{setProductSelection(i,"amount_unit",e.target.value)}}
                  >
                    <option disabled value="">----</option>
                    { units.map( (e) => {
                      if (e.name === storePricesForm[i].physical_unit) {
                        return Object.entries(e.units).map(([clave]) => <option key={clave} value={clave}>{clave}</option>)
                      }
                    }) }
                  </select>
                </div>
              </section>
              <button
                className="add-button"
                onClick={()=>{processData(i)}}
              >Add To Cart</button>
            </section>
          )})}
        </section>
      </section>
    </>
  )
}