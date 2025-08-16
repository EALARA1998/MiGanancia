export type Products = {
  id: number,
  name: string,
  img: string,
  physical_units: string[]
}

export type CartItem = {
  id: string
  name: string
  img: string
  physical_unit: string
  store_prices_amount: number
  store_prices_amount_unit: string
  store_prices_price: number
  product_selection_amount: number
  product_selection_amount_unit: string
  amount_units: string[]
  finalPrice: number
}

export type CartItemDraft = Omit<CartItem, "id" | "finalPrice">
export type CartMachineDraft = Pick<CartItem, "name" | "img" | "amount_units" > & {
  machine_power_consumption: number,
  machine_power_consumption_unit: string
  machine_time_amount: number,
  machine_time_amount_unit: string,
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
  units: {
    [key: string]: string | undefined;
  };
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
export type Machine = {
  name: string
  img: string
}