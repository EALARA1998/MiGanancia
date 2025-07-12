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
  physicalUnit: string
  units: string[]
  productUnit: string
  price: string
}
type Units = {
  id: number
  name: string,
  units: Unit[]
}
type Unit = {
  [ unitName: string ] : string
}
