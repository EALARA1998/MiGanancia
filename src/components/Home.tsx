import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect } from "react"
import { useStore } from "../store/useStore";

export default function Home() {

  const { iso4217Data, options, setOptions } = useStore()

  const iso4217DataSorted = iso4217Data.data.sort((a,b) => a.currency.localeCompare(b.currency))

  useEffect(()=>{
    console.log( iso4217DataSorted)
  },[])

  return (
    <>
      <section className="content_home">
        <h2>Home</h2>
        <section>
          <h3>Options:</h3>
          <section>
            <label htmlFor="option_currency" >Choose your currency:</label>
            <select
              id="option_currency"
              value={options.currency}
              onChange={(e)=>{
                setOptions("currency", e.target.value);
                const [, code] = e.target.value.split('|');
                setOptions("currencySymbol", getSymbolFromCurrency(code) || "");
              }}
            >
              <option value="">---</option>
              { iso4217DataSorted.map( (data,i) => (
                <option
                  key={i}
                  value={`${data.currency}|${data.code}`}
                >
                  {`${data.code} --- ${data.currency} --- ${getSymbolFromCurrency(data.code)}`}
                </option>
              ))}
            </select>
          </section>
        </section>
      </section>
    </>
  )
}