export default function formatCurrency(num) {
  return "S/. " + Number.parseFloat(num).toFixed(2).toLocaleString() + " ";
}
