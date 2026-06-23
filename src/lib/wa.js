export function waLink(number, text = "") {
  const clean = (number || "").replace(/[^0-9]/g, "").replace(/^0/, "62");
  const base = "https://wa.me/" + clean;
  return text ? base + "?text=" + encodeURIComponent(text) : base;
}
