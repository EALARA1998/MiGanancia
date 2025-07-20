export type Products = {
  id: number,
  name: string,
  img: string,
  physicalUnit: string[]
}
export type ProductLocalStorage = Pick<Products, "id" | "name" | "img"> & {
  physicalUnit: string,
  storeProductQuantity: string,
  storeProductUnit: string,
  price: string,
  productQuantity: string,
  productUnit: string,
}
export type CartItemType = Pick<Products, "id" | "name" | "img"> & {
  num: string
  quantity: string
  quantityMultiplied: string
  physicalUnit: string
  units: string[]
  productUnit: string
  price: string
  priceMultiplied: string
}
export type Units = {
  id: number
  name: string,
  units: Unit[]
}
export type Unit = {
  [ unitName: string ] : string
}
export type Summary = {
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
export type Fuel = {
  powerConsumptionElectricity: string
  powerConsumptionElectricityUnit: string
  priceElectricity: string
  priceElectricityUnit: string
  timeElectricity: string
  timeElectricityUnit: string
}