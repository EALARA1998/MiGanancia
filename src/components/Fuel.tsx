import type { Units, Fuel, CartItemType, Summary } from "../types"
import { IsPositive } from "../assets/utilities/dataValidation"
import { Convert } from "../assets/utilities/unitConversions"

type FuelProps = {
  units: Units[]
  fuel: Fuel
  setFuel: React.Dispatch<React.SetStateAction<Fuel>>
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>
  summary: Summary
}
export default function Fuel({units, fuel, setFuel, setCart, summary} : FuelProps) {
  return (
    <>
      <section className="content_fuel">
        <h2>Fuel</h2>
        <section className="content_fuel_electricity">
          <h3>Electricity</h3>
          <img src={`/img/electricity.png`} alt="electricity.png" width={100} height={100} />
          <section className="content_fuel_electricity_section">
            <h4>Power Consumption</h4>
            <div>
              <input type="text" value={fuel.powerConsumptionElectricity} onChange={(e)=>{
                const newValue = e.target.value
                if (IsPositive(newValue)) {
                  setFuel(prev => {
                    return { ...prev, powerConsumptionElectricity: newValue}
                  })
                }
              }}/>
              <select value={fuel.powerConsumptionElectricityUnit} onChange={e=>{
                const newValue = e.target.value
                setFuel(prev => {
                  return { ...prev, powerConsumptionElectricityUnit: newValue }
                })
              }}>
                <option disabled value="">----</option>
                { Object.entries(units.find(e => e.name === "power")?.units ?? {}).map(([key], i) => {
                  return <option key={i} value={key}>{key}</option>
                }) }
              </select>
            </div>
          </section>
          <section className="content_fuel_electricity_section">
            <h4>Price</h4>
            <div>
              <input type="text" value={fuel.priceElectricity} onChange={(e)=>{
                const newValue = e.target.value
                if (IsPositive(newValue)) {
                  setFuel(prev => {
                    return { ...prev, priceElectricity: newValue}
                  })
                }
              }}/>
              <select value={fuel.priceElectricityUnit}  onChange={e=>{
                  const newValue = e.target.value
                  setFuel(prev => {
                    return { ...prev, priceElectricityUnit: newValue }
                  })
                }}>
                <option disabled value="">----</option>
                { Object.entries(units.find(e => e.name === "rateOfPowerChange")?.units ?? {}).map(([key], i) => {
                  return <option key={i} value={key}>{key}</option>
                }) }
              </select>
            </div>
          </section>
          <section className="content_fuel_electricity_section">
            <h4>Time</h4>
            <div>
              <input type="text" value={fuel.timeElectricity} onChange={(e)=>{
                const newValue = e.target.value
                if (IsPositive(newValue)) {
                  setFuel(prev => {
                    return { ...prev, timeElectricity: newValue}
                  })
                }
              }}/>
              <select value={fuel.timeElectricityUnit} onChange={e=>{
                  const newValue = e.target.value
                  setFuel(prev => {
                    return { ...prev, timeElectricityUnit: newValue }
                  })
                }}>
                  <option disabled value="">----</option>
                { Object.entries(units.find(e => e.name === "time")?.units ?? {}).map(([key], i) => {
                  return <option key={i} value={key}>{key}</option>
                }) }
              </select>
            </div>
          </section>
          <button onClick={()=>{
          if (!fuel.powerConsumptionElectricity||!fuel.priceElectricity||!fuel.timeElectricity) {
            return
          }
          if (!fuel.powerConsumptionElectricityUnit||!fuel.priceElectricityUnit||!fuel.timeElectricityUnit) {
            return
          }
          const convertedTime = Convert("time", Number.parseFloat(fuel.timeElectricity), fuel.timeElectricityUnit, "h")
          const newPrice = (Number.parseFloat(fuel.priceElectricity)*Number.parseFloat(fuel.powerConsumptionElectricity)*convertedTime)
          setCart(prev => {
            return [...prev, { id: prev.length, num: `${prev.length+1}`, name: `Electricity`, img: `electricity.png`, quantity: `${fuel.timeElectricity}`, quantityMultiplied: `${Number.parseFloat(fuel.timeElectricity)*Number.parseFloat(summary.multiplier)}`, physicalUnit: "time", units: Object.entries(units.find(e => e.name === "time")?.units ?? []).map(([key]) => key), productUnit: fuel.timeElectricityUnit, price: `${newPrice}`, priceMultiplied: `${newPrice*Number.parseFloat(summary.multiplier)}`}]
          })
        }}>Add To Cart</button>
        </section>
      </section>
    </>
  )
}