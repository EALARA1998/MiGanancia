import { useEffect, useState } from "react"
import type { Summary } from "../types"

export default function useSummary() {
  function InitialSummary() : Summary {
    const localStorageSummary = localStorage.getItem("summary")
    if (!localStorageSummary) {
      return {
        multiplier: "1",
        totalItems: "",
        quantityProduced: "",
        sellingPricePerUnit: "",
        costPerUnit: "",
        profitPerUnit: "",
        profitPercent: "",
        totalCost: "",
        totalProfit: "",
        totalSellingPrice: ""
      }
    }else{
      return JSON.parse(localStorageSummary)
    }
  }
  const [summary, setSummary] = useState<Summary>(InitialSummary())
  useEffect(()=>{
    localStorage.setItem("summary", JSON.stringify(summary))
  },[summary])
  return {
    summary,
    setSummary
  }
}