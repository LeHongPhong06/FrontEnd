import {AlertConfirm, AlertError} from './alert';
import {isDateBetween, isDateSameOrAfter, isDateSameOrBefore} from './calcDate';
import {calcFileSize} from './calcFileSize';
import {
  formatDateISO,
  formatDateString,
  formatDateStringTimes,
} from './fomatDateString';
import {getColor} from './getColorStatus';
import {getFilePath} from './getFilePath';
import {HandleNotification} from './notification';
import {getRoleName} from './roleName';
import {socket} from './socket';
import ShowToast from './toastAndroid';
import {Validate} from './validate';

export {
  AlertConfirm,
  AlertError,
  HandleNotification,
  ShowToast,
  Validate,
  calcFileSize,
  formatDateISO,
  formatDateString,
  formatDateStringTimes,
  getColor,
  getFilePath,
  getRoleName,
  isDateBetween,
  isDateSameOrAfter,
  isDateSameOrBefore,
  socket,
};
