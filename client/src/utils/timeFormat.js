exports.formatDateWithOffset = function(dateInput, hourOffset = 0) {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  if (isNaN(date)) return "";

  
  const adjusted = new Date(date.getTime() + hourOffset * 60 * 60 * 1000);

  return adjusted.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
