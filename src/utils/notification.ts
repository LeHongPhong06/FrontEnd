import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {userApi} from '../apis';

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
  // static sendNotification = async ({
  //   userId,
  //   title,
  //   body,
  //   taskId,
  // }: {
  //   userId: string;
  //   title: string;
  //   body: string;
  //   taskId: string;
  // }) => {
  //   try {
  //     // save to firestore
  //     const user = await userApi.getById(userId);

  //     // send notification

  //     if (user) {
  //       var myHeaders = new Headers();
  //       myHeaders.append('Content-Type', 'application/json');
  //       myHeaders.append('Authorization', `key=${serverKey}`);

  //       var raw = JSON.stringify({
  //         registration_ids: user.fcmToken,
  //         notification: {
  //           title,
  //           body,
  //         },
  //         data: {
  //           taskId,
  //         },
  //       });

  //       var requestOptions: any = {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: 'follow',
  //       };

  //       fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
  //         .then(response => response.text())
  //         .then(result => console.log(result))
  //         .catch(error => console.log('error', error));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
