export default function DateTime({
  date,
  options: { weekday, year, month, day, hour, minute, second },
}) {
  let currLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  function getDate() {
    return new Intl.DateTimeFormat(currLocale, {
      weekday,
      year,
      month,
      day,
      hour,
      minute,
      second,
    }).format(Date.parse(date));
  }

  return <>{getDate()}</>;
}

DateTime.defaultProps = {
  options: {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};
