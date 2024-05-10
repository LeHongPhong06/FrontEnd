import {colors} from '../constants';

export const getColor = (statusId: string) => {
  switch (statusId) {
    case 'unfinished':
      return colors.blue;
    case 'finished':
      return colors.green;
    case 'completedlate':
      return colors.yellow;
    case 'late':
      return colors.danger;
    case 'pending':
      return colors.oranger;
    default:
      return colors.text;
  }
};
