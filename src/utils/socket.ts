import {Platform} from 'react-native';
import {io} from 'socket.io-client';

const URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8888' : 'http://localhost:8888';

export const socket = io(URL);
