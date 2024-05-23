import dayjs from "dayjs";

export default function (dateStr: string) {
  return dayjs(dateStr).format("YYYY-MM-DD");
}
