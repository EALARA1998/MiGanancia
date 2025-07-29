import { useEffect, useState } from "react"
import type { ProductLocalStorage, Products } from "../types"
import productsJson from "../assets/data/products.json"

export default function useProductsLS() {
  const products : Products[] =  productsJson
  function InitialProductLS() : ProductLocalStorage[]{
    const localStorageProductLS = localStorage.getItem("productLS");

    if (!localStorageProductLS) {
      return products.map((product) => ({
        id: product.id,
        name: product.name,
        img: product.img,
        physicalUnit: "",
        storeProductQuantity: "",
        storeProductUnit: "",
        price: "",
        productQuantity: "",
        productUnit: ""
      }));
    }

    const productsLS: ProductLocalStorage[] = JSON.parse(localStorageProductLS);

    // Crear un Map para buscar más fácilmente por id
    const productsLSMap = new Map(productsLS.map(p => [p.id, p]));

    const mergedProducts = products.map(product => {
      const storedProduct = productsLSMap.get(product.id);
      if (storedProduct) {
        // Si existe en LS, actualiza su nombre o imagen si han cambiado
        return {
          ...storedProduct,
          name: product.name,
          img: product.img
        };
      } else {
        // Si es nuevo, inicialízalo
        return {
          id: product.id,
          name: product.name,
          img: product.img,
          physicalUnit: "",
          storeProductQuantity: "",
          storeProductUnit: "",
          price: "",
          productQuantity: "",
          productUnit: ""
        };
      }
    });

    return mergedProducts;
  }
  const [productsLS, setProductsLS] = useState<ProductLocalStorage[]>(InitialProductLS())
  useEffect(()=>{
    localStorage.setItem("productLS", JSON.stringify(productsLS))
  },[productsLS])
  return {
    productsLS,
    setProductsLS,
    products
  }
}