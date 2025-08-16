import { useForm } from "react-hook-form";
import { useStore } from "../store/useStore";
import { getDisplayAmount, stringToNumberWithoutEmpty } from "../helpers/dataValidation";
import type { CartMachineDraft } from "../types";

type FormValues = {
  electricity_price: number
  electricity_unit: string
  machines: {
    power_consumption: number
    power_unit: string;
    time: number;
    time_unit: string;
  }[]
}

type MachinesProps = {

}

export default function Machines({} : MachinesProps) {

  const { register } = useForm<FormValues>()

  const { units, machines, machinesForm, setElectricity, setMachine, addMachineToCart } = useStore()

  const getUnits = (unitType: string) => Object.entries(units.find((e) => e.name === unitType)?.units ?? {});

  const processData = (i: number) => {
    const productInfo = machines[i]
    const { name, img } = productInfo
    const machineInfo = machinesForm.machines[i]

    const amount_units = units.flatMap((e) => {
      if (e.name === "time") {
        return Object.keys(e.units);
      }
      return [];
    });

    const cartMachine: CartMachineDraft = {
      name: name,
      img: img,
      amount_units: amount_units,
      machine_power_consumption: machineInfo.power_consumption,
      machine_power_consumption_unit: machineInfo.power_unit,
      machine_time_amount: machineInfo.time,
      machine_time_amount_unit: machineInfo.time_unit
    }

    addMachineToCart(cartMachine)
  };

  return (
    <section className="content_machines">
      <h2>Machines</h2>
      <section className="content_machines_electricity">
        <h3>Electricity</h3>
        <img src="/img/electricity.png" alt="electricity.png" />
        <section>
          <label 
            htmlFor="electricity_price"
            >Price</label>
          <div>
            <input 
              {...register("electricity_price")}
              id="electricity_price" 
              type="number"
              value={getDisplayAmount(machinesForm.electricity_price)}
              onChange={(e) => setElectricity("electricity_price", stringToNumberWithoutEmpty(e.target.value))}
              />
            <select 
              {...register("electricity_unit")}
              value={machinesForm.electricity_unit}
              onChange={(e) => setElectricity("electricity_unit", e.target.value)}
            >
              <option disabled value="">----</option>
              { getUnits("rateOfPowerChange").map(([key], i) => {
                return <option key={i} value={key}>{key}</option>
              }) }
            </select>
          </div>
        </section>
      </section>
      <section className="content_machines_machines-section">
        {machines.map((m, i) => { 
          const machineData = machinesForm.machines[i] || {
            power_consumption: 0,
            power_unit: "",
            time: 0,
            time_unit: ""
          };
          return (
          <section key={i} className="content_machines_machines-section_machine">
            <h3>{m.name}</h3>
            <img
              src={`/img/${m.img}`} 
              alt={m.img}
            />
            <section>
              <section>
                <label 
                  htmlFor={`${m.name.toLowerCase().replace(/\s+/g, '_')}_power-consumption`}
                >Power Consumption</label>
                <div>
                  <input 
                    {...register(`machines.${i}.power_consumption` as const)}
                    id={`${m.name.toLowerCase().replace(/\s+/g, '_')}_power-consumption`}
                    type="number"
                    value={getDisplayAmount(machineData.power_consumption)}
                    onChange={(e) => setMachine(i, "power_consumption", stringToNumberWithoutEmpty(e.target.value))}
                    />
                  <select
                    {...register(`machines.${i}.power_unit` as const)}
                    value={machineData.power_unit}
                    onChange={(e) => setMachine(i, "power_unit", e.target.value)}
                    >
                    <option disabled value="">----</option>
                    { getUnits("power").map(([key], i) => {
                      return <option key={i} value={key}>{key}</option>
                    }) }
                  </select>
                </div>
              </section>
              <section>
                <label 
                  htmlFor={`${m.name.toLowerCase().replace(/\s+/g, '_')}_time`}
                  >Time</label>
                <div>
                  <input 
                    {...register(`machines.${i}.time` as const)} 
                    type="number"
                    id={`${m.name.toLowerCase().replace(/\s+/g, '_')}_time`} 
                    value={getDisplayAmount(machineData.time)}
                    onChange={(e) => setMachine(i, "time", stringToNumberWithoutEmpty(e.target.value))}
                    />
                  <select
                    {...register(`machines.${i}.time_unit` as const)}
                    value={machineData.time_unit}
                    onChange={(e) => setMachine(i, "time_unit", e.target.value)}
                  >
                    <option disabled value="">----</option>
                    { getUnits("time").map(([key], i) => {
                      return <option key={i} value={key}>{key}</option>
                    }) }
                  </select>
                </div>
              </section>
            </section>
            <button 
              className="add-button"
              type="button" 
              onClick={() => processData(i)}>
              Add To Cart
            </button>
          </section>
        )})}
      </section>
    </section>
  )
}