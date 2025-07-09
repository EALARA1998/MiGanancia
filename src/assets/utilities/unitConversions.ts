import rawUnitsJson from '../data/units.json';

type DimensionName = 
  | 'mass'
  | 'length'
  | 'volume'
  | 'area'
  | 'time'
  | 'speed'
  | 'energy'
  | 'pressure'
  | 'power'
  | 'frequency'
  | 'temperature'

type PhysicalUnit = {
  name: DimensionName,
  units: Unit
}
type Unit = {
  [unitName: string]: string;
}

const unitsJson = rawUnitsJson as unknown as PhysicalUnit[];

export function Convert(category: DimensionName, value: number, fromUnit: string, toUnit:string): number {
  const unit = unitsJson.find(pU => pU.name === category);
  if (!unit) {
    throw new Error(`Category "${category}" not found`);
  }
  if (!(fromUnit in unit.units)) {
    throw new Error(`Unit "${fromUnit}" not found in category "${category}"`);
  }
  if (!(toUnit in unit.units)) {
    throw new Error(`Unit "${toUnit}" not found in category "${category}"`);
  }
  if (category === `temperature`) {
    return ConvertTemperature(value, fromUnit, toUnit)
  }else{
    const fromUnitValue = parseFloat(unit.units[fromUnit]);
    const toUnitValue = parseFloat(unit.units[toUnit]);
    return value * (fromUnitValue / toUnitValue);
  }

}

function ConvertTemperature(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit==='celsius'&&toUnit==='fahrenheit') {
    return 9/5*value+32
  }else if(fromUnit==='fahrenheit'&&toUnit==='celsius'){
    return 5/9*(value-32)
  }else if(fromUnit==='celsius'&&toUnit==='kelvin'){
    return value+273.15
  }else if(fromUnit==='kelvin'&&toUnit==='celsius'){
    return value-273.15
  }else if(fromUnit==='fahrenheit'&&toUnit==='kelvin'){
    return 5/9*(value-32)+273.15
  }else if(fromUnit==='kelvin'&&toUnit==='fahrenheit'){
    return 9/5*(value-273.15)+32
  }else{
    return -1
  }
  
}
console.log(Convert("temperature", 127, 'fahrenheit', 'kelvin'));
