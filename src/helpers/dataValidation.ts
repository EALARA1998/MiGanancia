export function isNumeric (text: string): boolean {
  return /^-?\d*\.?\d*$/.test(text);
}
export function isPositive(amount: number): boolean {
  return amount > 0  
}
export function getDisplayAmount(amount: number): string | number {
  return amount === 0 ? "" : amount;
}
export function stringToNumberWithoutEmpty(amount: string) : number{
  try {
    const float = parseFloat(amount)
    if (isNaN(float)) return 0
    return isPositive(float) ? float : 0
  } catch (error) {
    return 0
  }
}