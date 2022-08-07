export const currencyFm = new Intl.NumberFormat("vn-VN", {
  style: "currency",
  currency: "VND",
});

export const pageTitle = (value: string) => {
  const PN = document.querySelector("#setPageName");
  if (!PN) return
  else PN.innerHTML = value;
};
