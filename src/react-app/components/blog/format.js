// Parses YYYY-MM-DD as a local date so it never shifts a day across time zones.
export const formatDate = (iso) => {
  const [year, month, day] = String(iso).split("T")[0].split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
};
