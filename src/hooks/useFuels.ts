import { useEffect, useState } from "react"
import type { Fuels } from "../types"

export default function useFuel() {
  function InitialFuel() : Fuels {
    const localStorageFuel = localStorage.getItem("fuel")
    if (!localStorageFuel) {
      return {
        powerConsumptionElectricity: "1.5",
        powerConsumptionElectricityUnit: "kW",
        priceElectricity: "6.4031",
        priceElectricityUnit: "kW/h",
        timeElectricity: "",
        timeElectricityUnit: "min",
      }
    }else{
      return JSON.parse(localStorageFuel)
    }
  }
  const [fuel, setFuel] = useState<Fuels>(InitialFuel())
  useEffect(()=>{
    localStorage.setItem("fuel", JSON.stringify(fuel))
  },[fuel])
  return {
    fuel,
    setFuel
  }
}