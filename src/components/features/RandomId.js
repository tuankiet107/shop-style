export default function RandomId() {
  let id = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
}
