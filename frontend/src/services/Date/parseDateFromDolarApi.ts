// const dateRegex = /^(?<date>\d{4}-\d{2}-\d{2})T(?<time>\d{2}:\d{2}:\d{2})Z$/;

const dateRegex = new RegExp(
  '^' + // Start of the string
    /(?<year>\d{4})-/.source + // Gets the year
    /(?<month>\d{2})-/.source + // The month
    /(?<day>\d{2})T/.source + // The day
    /(?<hours>\d{2}):/.source + // Gets the hour
    /(?<minutes>\d{2}):/.source + // the minutes
    /(?<seconds>\d{2})/.source + // the seconds
    'Z$' // End of the string
);

const parseDateFromDolarApi = (dateSring: string): Date => {
  const matched = dateSring.match(dateRegex);

  if (!matched || !matched.groups)
    throw "Date string doesn't match the required regex";

  const [year, month, day, hours, minutes, seconds] = Object.values(
    matched.groups
  ).map(Number);

  const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);

  return dateObj;
};

export default parseDateFromDolarApi;
