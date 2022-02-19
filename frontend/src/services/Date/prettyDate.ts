const addLeadingZeroes = (value: number, expectedLength: number): string => {
  let retornableValue = String(value);
  while (retornableValue.length !== expectedLength) {
    retornableValue = '0' + retornableValue;
  }
  return retornableValue;
};

export const prettyDate = (dateObj: Date): string => {
  const day = addLeadingZeroes(dateObj.getDate(), 2);
  const month = addLeadingZeroes(dateObj.getMonth() + 1, 2);
  const year = dateObj.getFullYear();

  const hours = addLeadingZeroes(dateObj.getHours(), 2);
  const minutes = addLeadingZeroes(dateObj.getMinutes(), 2);

  return `${day}/${month}/${year}  ${hours}:${minutes}`;
};
