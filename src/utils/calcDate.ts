import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const isDateSameOrAfter = (
  dateStart: string | Date | number | undefined,
  dateEnd: string | Date | number | undefined,
) => {
  return dayjs(dateStart).isSameOrAfter(dateEnd, 'day');
};

export const isDateSameOrBefore = (
  dateStart: string | Date | number | undefined,
  dateEnd: string | Date | number | undefined,
) => {
  return dayjs(dateStart).isSameOrBefore(dateEnd, 'day');
};

export const isDateBetween = (
  date: string | Date | number | undefined,
  dateStart: string | Date | number | undefined,
  dateEnd: string | Date | number | undefined,
) => {
  return (
    isDateSameOrAfter(date, dateStart) && isDateSameOrBefore(date, dateEnd)
  );
};
