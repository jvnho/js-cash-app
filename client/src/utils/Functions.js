export function formatPrice(n){
  if(n === -0){
    n = Math.abs(n);
  }
  return formatter.format(n);
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});