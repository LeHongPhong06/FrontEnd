import {format, formatISO} from 'date-fns';
import {vi} from 'date-fns/locale/vi';

export const formatDateString = (date: string | number | Date) => {
  return format(date, 'dd/MM/yyyy');
};

export const formatDateStringTimes = (date: string | number | Date) => {
  return format(date, 'dd/MM/yyyy HH:mm:ss ', {
    locale: vi,
  });
};
export const formatDateISO = (date: string | number | Date) => {
  return formatISO(date);
};
