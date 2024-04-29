import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from 'date-fns';

export const truncateAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const createOptionArray = (array: any[]) =>
  array.map((item) => ({
    label: item,
    value: item,
  }));

export const calculateAge = (date: string) => {
  const oldDate = parseISO(date);
  const currentDate = new Date();
  const difference = +currentDate - +oldDate;
  if (difference < 3600000)
    return differenceInMinutes(currentDate, oldDate) + ' minutes ago';
  if (difference < 86400000)
    return differenceInHours(currentDate, oldDate) + ' hours ago';
  return differenceInDays(currentDate, oldDate) + ' days ago';
};
