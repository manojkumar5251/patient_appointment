import PushNotification from 'react-native-push-notification';

export * from './sendEmail';

export const localNotification = ({title, message}) => {
  PushNotification.localNotification({
    channelId: 'All',
    title,
    message,
  });
};
