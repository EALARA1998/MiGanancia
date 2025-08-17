import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from "zustand";
import productsJson from "../data/products.json";
import unitsJson from "../data/units.json";
import machinesJson from "../data/machines.json";
import currencyCode from "currency-codes";
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CartItem, CartItemDraft, CartMachineDraft, Machine, Products, Units } from "../types";
import { Convert } from '../helpers/unitConversions';

type MachineData = {
  power_consumption: number;
  power_unit: string;
  time: number;
  time_unit: string;
};

type MachinesFormValues = {
  electricity_price: number;
  electricity_unit: string;
  machines: MachineData[];
};

type StorePricesFormValues = {
  name: string
  physical_unit: string
  amount: number
  amount_unit: string
  price: number
};

type ProductSelectionFormValues = {
  amount: number
  amount_unit: string
};

type StoreState = {
  iso4217Data: typeof currencyCode
  options: {
    currency: string
    currencySymbol: string
  }
  cart: CartItem[]
  cartMultiplier: number
  cartQuantityProduced: number
  cartSellingPricePerUnit: number
  products: Products[]
  units: Units[]
  machines: Machine[]
  machinesForm: MachinesFormValues;
  storePricesForm: StorePricesFormValues[]
  productSelectionForm: ProductSelectionFormValues[]
  downloadCurrentCart: () => void
  uploadCart: (file: File) => void
  downloadCurrentStorePrices: () => void
  uploadStorePrices: (file: File) => void
  setOptions: (option: keyof StoreState["options"], newValue: string) => void
  setCart: (newCart: CartItem[]) => void
  setCartQuantityProduced: (newValue: number) => void
  setCartSellingPricePerUnit: (newValue: number) => void
  setCartMultiplier: (newValue: number) => void
  setProductSelectionAmountUnit: (id: CartItem["id"], newUnit: string) => void
  setElectricity: (key: "electricity_price" | "electricity_unit", value: any) => void;
  setMachine: (i: number, key: keyof MachineData, value: any) => void;
  setStorePrices: (i: number, key: keyof StorePricesFormValues, value: any) => void;
  setProductSelection: (i: number, key: keyof ProductSelectionFormValues, value: any) => void;
  addProductToCart: (cartItemDraft: CartItemDraft) => void;
  addMachineToCart: (cartMachineDraft: CartMachineDraft) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
}

function getFinalPriceProduct(
  physical_unit: string,
  store_prices_amount: number,
  store_prices_amount_unit: string,
  store_prices_price: number,
  product_selection_amount: number,
  product_selection_amount_unit: string,
) : number {
  const converted = Convert(physical_unit,product_selection_amount,product_selection_amount_unit,store_prices_amount_unit)
  return (store_prices_price/store_prices_amount*converted)
}
function getFinalPriceMachine(
  machine_power_consumption: number,
  machine_power_consumption_unit: string,
  electricity_price: number,
  machine_time_amount: number,
  machine_time_amount_unit: string,
) : number {
  const powerConsumptionConverted = Convert("power",machine_power_consumption,machine_power_consumption_unit,"kW")
  const timeConverted = Convert("time",machine_time_amount,machine_time_amount_unit,"h")
  return (electricity_price*powerConsumptionConverted*timeConverted)
}

export const useStore = create<StoreState>()(
  devtools(
    persist<StoreState>(
      (set, get) => ({
        iso4217Data: currencyCode,
        options: {
          currency: "",
          currencySymbol: ""
        },
        cart: [],
        cartMultiplier: 1,
        cartQuantityProduced: 0,
        cartSellingPricePerUnit: 0,
        products: productsJson,
        units: unitsJson,
        machines: machinesJson,
        machinesForm: {
          electricity_price: 6.4031,
          electricity_unit: "kWh",
          machines: machinesJson.map(() => ({
            power_consumption: 0,
            power_unit: "",
            time: 0,
            time_unit: ""
          }))
        },
        storePricesForm: productsJson.map((p)=>({
          name: p.name,
          physical_unit: "",
          amount: 0,
          amount_unit: "",
          price: 0,
        })),
        productSelectionForm: productsJson.map(()=>({
          amount: 0,
          amount_unit: "",
        })),

        setCart: (newCart) => {
          set(() => ({
            cart: newCart
          }))
        },

        uploadStorePrices: (file: File) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const text = e.target?.result as string;
              const json: StorePricesFormValues[] = JSON.parse(text);
              const newArray = get().storePricesForm.map( p => {
                return json.find( e => e.name === p.name) || p
              } )
              set(() => ({
                storePricesForm: newArray
              }));
              toast("Store Prices uploaded correctly.", {
                type: "success",
                autoClose: 2000,
                position: "bottom-right"
              });
            } catch (error) {
              console.error("Error al leer el archivo JSON:", error);
              toast("Error al leer el archivo JSON", {
                type: "error",
                autoClose: 2000,
                position: "bottom-right"
              });
            }
          };
          reader.readAsText(file);
        },

        downloadCurrentStorePrices() {
          const dataStr = JSON.stringify(get().storePricesForm, null, 2); // convertir object a texto JSON con formato
          const blob = new Blob([dataStr], { type: "application/json" });
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "datos.json"; // nombre del archivo
          link.click();

          URL.revokeObjectURL(url); // limpiar memoria
        },

        uploadCart: (file: File) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const text = e.target?.result as string;
              const json: CartItem[] = JSON.parse(text);
              set(() => ({ cart: json }));
              toast("Carrito cargado correctamente", {
                type: "success",
                autoClose: 2000,
                position: "bottom-right"
              });
            } catch (error) {
              console.error("Error al leer el archivo JSON:", error);
              toast("Error al leer el archivo JSON", {
                type: "error",
                autoClose: 2000,
                position: "bottom-right"
              });
            }
          };
          reader.readAsText(file);
        },

        downloadCurrentCart: () => {
          const dataStr = JSON.stringify(get().cart, null, 2); // convertir object a texto JSON con formato
          const blob = new Blob([dataStr], { type: "application/json" });
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "datos.json"; // nombre del archivo
          link.click();

          URL.revokeObjectURL(url); // limpiar memoria
        },

        setOptions: (option, newValue) => {
          set((state) => ({
            options: { ...state.options, [option]: newValue }
          }))
        },

        setCartMultiplier: (newValue) => {
          set(() => ({
            cartMultiplier: newValue
          }))
        },
        
        setCartQuantityProduced: (newValue) => {
          set(() => ({
            cartQuantityProduced: newValue
          }))
        },
        
        setCartSellingPricePerUnit: (newValue) => {
          set(() => ({
            cartSellingPricePerUnit: newValue
          }))
        },

        setProductSelectionAmountUnit: (id, newUnit) => {
          const newCart = get().cart.map( item => item.id !== id ? item : { ...item, product_selection_amount: Convert(item.physical_unit, item.product_selection_amount, item.product_selection_amount_unit, newUnit), product_selection_amount_unit: newUnit } )
          set(() => ({
            cart: newCart
          }))
        },
        
        setElectricity: (key, value) => {
          set((state) => ({
            machinesForm: { ...state.machinesForm, [key]: value }
          }))
        },

        setMachine: (i, key, value) => {
          set((state) => {
            const machines = [...state.machinesForm.machines];
            machines[i] = { ...machines[i], [key]: value };
            return { machinesForm: { ...state.machinesForm, machines } };
          })
        },
        
        setStorePrices: (i, key, value) => {
          if (key === "physical_unit") {
            set((state) => {
              const storePrices = [...state.storePricesForm];
              storePrices[i] = { ...storePrices[i], [key]: value, amount_unit: "" };
              
              const productSelection = [...state.productSelectionForm]
              productSelection[i] = { ...productSelection[i], amount_unit: ""}
              return { storePricesForm: storePrices, productSelectionForm: productSelection };
            })
          }else{
            set((state) => {
              const storePrices = [...state.storePricesForm];
              storePrices[i] = { ...storePrices[i], [key]: value };
              return { storePricesForm: storePrices };
            })
          }
        },
        setProductSelection: (i, key, value) => {
          set((state) => {
            const productSelectionForm = [...state.productSelectionForm];
            productSelectionForm[i] = { ...productSelectionForm[i], [key]: value };
            return { productSelectionForm: productSelectionForm };
          })
        },
        addProductToCart: (cartItemDraft) => {
          const {
            physical_unit,
            store_prices_amount,
            store_prices_amount_unit,
            product_selection_amount,
            product_selection_amount_unit,
            amount_units,
            store_prices_price
          } = cartItemDraft
          if (
            physical_unit === "" ||
            store_prices_amount === 0 ||
            store_prices_amount_unit === "" ||
            product_selection_amount === 0 ||
            product_selection_amount_unit === "" ||
            amount_units.length === 0 ||
            store_prices_price === 0
          ){
            toast("Los valores no deben estar vacios.", {
              type: "error",
              autoClose: 2000,
              position: "bottom-right"
            })
            return
          }
          const finalPrice = getFinalPriceProduct(
            physical_unit,
            store_prices_amount,
            store_prices_amount_unit,
            store_prices_price,
            product_selection_amount,
            product_selection_amount_unit
          ) 
          const cartItem: CartItem = {
            id: uuidv4(),
            finalPrice: finalPrice,
            ...cartItemDraft
          }
          set((state) => {
            return { cart: [...state.cart, cartItem] };
          })
          toast(`${cartItem.name} se ha añadido al carrito.`, {
            type: "success",
            autoClose: 2000,
            position: "bottom-right"
          })
        },
        addMachineToCart: (cartMachineDraft) => {
          const {
            name,
            img,
            amount_units,
            machine_power_consumption,
            machine_power_consumption_unit,
            machine_time_amount,
            machine_time_amount_unit
          } = cartMachineDraft
          if (
            amount_units.length === 0 ||
            machine_power_consumption === 0 ||
            machine_time_amount === 0 ||
            machine_time_amount_unit === ""
          ){
            toast("Los valores no deben estar vacios.", {
              type: "error",
              autoClose: 2000,
              position: "bottom-right"
            })
            return
          }
          const finalPrice = getFinalPriceMachine(
            machine_power_consumption,
            machine_power_consumption_unit,
            get().machinesForm.electricity_price,
            machine_time_amount,
            machine_time_amount_unit,
          )
          const cartItem: CartItem = {
            id: uuidv4(),
            name: name,
            img: img,
            physical_unit: "time",
            store_prices_amount: get().machinesForm.electricity_price,
            store_prices_amount_unit: get().machinesForm.electricity_unit,
            store_prices_price: 0,
            product_selection_amount: machine_time_amount,
            product_selection_amount_unit: machine_time_amount_unit,
            amount_units: amount_units,
            finalPrice: finalPrice,
          }
          set((state) => {
            return { cart: [...state.cart, cartItem] };
          })
          toast(`${cartItem.name} se ha añadido al carrito.`, {
            type: "success",
            autoClose: 2000,
            position: "bottom-right"
          })
        },
        removeItemFromCart: (id) => {
          const newCart = get().cart.filter(item => ( item.id !== id ))
          set(() => {
            return { cart: newCart };
          })  
        }
      }),
      {
        name: "mi-ganancia-storage",
        version: 2,
        migrate: (persistedState, version) => {
          if (version < 2) {
            return {
              cart: [],
              cartMultiplier: 1,
              cartQuantityProduced: 0,
              cartSellingPricePerUnit: 0,
              options: { currency: "", currencySymbol: "" },
              machinesForm: {
                electricity_price: 6.4031,
                electricity_unit: "kWh",
                machines: machinesJson.map(() => ({
                  power_consumption: 0,
                  power_unit: "",
                  time: 0,
                  time_unit: ""
                }))
              },
              storePricesForm: productsJson.map((p) => ({
                name: p.name,
                physical_unit: "",
                amount: 0,
                amount_unit: "",
                price: 0,
              })),
              productSelectionForm: productsJson.map(() => ({
                amount: 0,
                amount_unit: "",
              })),
            } as unknown as StoreState
          }
          return persistedState as StoreState
        }
        // storage: createJSONStorage(()=>sessionStorage),
        //storage: createJSONStorage(()=>localStorage),
      }
    )
  )
)