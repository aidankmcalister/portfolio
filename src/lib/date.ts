// Blog dates are plain YYYY-MM-DD strings; format them in UTC so they never shift a day.
export function formatDate(iso: string, month: "short" | "long" = "short") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}
