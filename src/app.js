import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import AppNavigator from './routes';
import PushNotification from 'react-native-push-notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const App = () => {
  useEffect(() => {
    PushNotification.channelExists('All', exist => {
      if (exist) {
        return;
      }
      PushNotification.createChannel(
        {channelId: 'All', channelName: 'My channel'},
        created => console.log(`createChannel returned '${created}'`),
      );
    });
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? -hp(1) : 0,
//     marginBottom: Platform.OS === 'ios' ? -hp(2) : 0,
//   },
// });

export default App;
