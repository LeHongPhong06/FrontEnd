import {format} from 'date-fns';

export const formatDateString = (dateString: string) => {
  format(new Date(dateString), 'yyyy-MM-dd');
};
