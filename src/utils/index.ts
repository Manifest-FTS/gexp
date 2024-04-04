import { differenceInDays, parseISO } from 'date-fns';

export const truncateAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const createOptionArray = (array: any[]) =>
  array.map((item) => ({
    label: item,
    value: item,
  }));

export const calculateAgeInDays = (date: string) => {
  const oldDate = parseISO(date);
  const currentDate = new Date();
  return differenceInDays(currentDate, oldDate);
};
