type Products = {
  id: number,
  name: string,
  img: string,
  physicalUnit: string[]
}
type ProductLocalStorage = {
  id: number,
  name: string,
  img: string
  physicalUnit: string,
  storeProductQuantity: string,
  storeProductUnit: string,
  price: string,
  productQuantity: string,
  productUnit: string,
}
type CartItemType = {
  id: string,
  num: string
  name: string,
  img: string,
  quantity: string
  quantityMultiplied: string
  physicalUnit: string
  units: string[]
  productUnit: string
  price: string
  priceMultiplied: string
}
type Units = {
  id: number
  name: string,
  units: Unit[]
}
type Unit = {
  [ unitName: string ] : string
}
type Summary = {
  multiplier: string
  totalItems: string
  quantityProduced: string
  sellingPricePerUnit: string
  costPerUnit: string
  profitPerUnit: string
  profitPercent: string
  totalCost: string
  totalProfit: string
  totalSellingPrice: string
}
type Fuel = {
  powerConsumptionElectricity: string
  powerConsumptionElectricityUnit: string
  priceElectricity: sting
  priceElectricityUnit: sting
  timeElectricity: string
  timeElectricityUnit: string
}