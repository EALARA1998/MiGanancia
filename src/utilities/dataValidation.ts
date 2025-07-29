function IsNumeric (text: string): boolean {
  return /^-?\d*\.?\d*$/.test(text);
}
function IsPositive(text: string): boolean {
  if (text === "") {
    return true
  }
  if(IsNumeric(text)){
    const parseFloat = Number.parseFloat(text)
    return parseFloat > 0
  }
  return false
}
export { IsNumeric, IsPositive }
