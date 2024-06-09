import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {userApi} from '../apis';
import {globalApp} from '../constants';

export class HandleNotification {
  static checkNotificationPersion = async () => {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };
  static getFcmToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();
      console.log('token :>> ', token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        this.updateFcmTokenForUser(token);
      }
    } else {
      this.updateFcmTokenForUser(fcmToken);
    }
  };
  static updateFcmTokenForUser = async (token: string) => {
    const res = await AsyncStorage.getItem('auth');
    if (res) {
      const auth = JSON.parse(res);
      const {fcmToken} = auth;
      if (fcmToken && !fcmToken.includes(token)) {
        fcmToken.push(token);
        const response = await userApi.updateFcmToken(auth.userId, {fcmToken});
        console.log('response :>> ', response);
      }
    }
  };
  static sendNotification = async ({
    userId,
    title,
    body,
    taskId,
  }: {
    userId: string;
    title: string;
    body: string;
    taskId: string;
  }) => {
    try {
      const user: any = await userApi.getById(userId);
      if (user) {
        const data = {
          registration_ids: user.fcmToken,
          notification: {title, body},
          data: {taskId},
        };
        await axios
          .post('https://fcm.googleapis.com/fcm/send', data, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key=${globalApp.serverKey}`,
            },
          })
          .then((response: any) => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
