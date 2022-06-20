export function formatDate(date: Date, format?: string) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return [year, month, day].join("-");
    case "MM-DD":
      return [month, day].join("-");
    case "YYYY":
      return year;
    case "MM":
      return month;
    case "DD":
      return day;
    default:
      return [year, month, day].join("-");
  }
}

export function getDayOfWeek(day: number) {
  switch (day) {
    case 0:
      return "일요일";
    case 1:
      return "월요일";
    case 2:
      return "화요일";
    case 3:
      return "수요일";
    case 4:
      return "목요일";
    case 5:
      return "금요일";
    case 6:
      return "토요일";
    default:
      throw new Error(`not supported day: ${day}`);
  }
}
