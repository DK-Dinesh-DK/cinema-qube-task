export function normalizeTime(time) {
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
  }

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }

  return [hours, minutes, seconds]
    .map((num) => String(num).padStart(2, "0"))
    .join(":");
}
