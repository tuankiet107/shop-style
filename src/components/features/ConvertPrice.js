export default function ConvertPrice(price) {
  let amount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return amount;
}
