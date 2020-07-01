import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './Components/Store';
import Tweets from './Components/tweets';
import PushNotification from 'react-native-push-notification';
import {Alert, AsyncStorage} from 'react-native';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});
export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};
import BackgroundTask from 'react-native-background-task';

BackgroundTask.define(async () => {
  // Fetch some data over the network which we want the user to have an up-to-
  // date copy of, even if they have no network when using the app
  const response = Tweets;
  const text = await response.text();

  // Data persisted to AsyncStorage can later be accessed by the foreground app
  await AsyncStorage.setItem('TweetsNow', text);

  // Remember to call finish()
  BackgroundTask.finish();
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
type Props = {};
class App extends Component<Props> {
  componentDidMount() {
    BackgroundTask.schedule({
      period: 1800,
    });
    this.checkStatus();
  }
  async checkStatus() {
    const status = await BackgroundTask.statusAsync();
    if (status.available) {
      return;
    }
    const reason = status.unavailableReason;
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert(
        'Denied',
        'Please enable background "Background App Refresh" for this app',
      );
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert(
        'Restricted',
        'Background tasks are restricted on your device',
      );
    }
  }
  test = () => {
    PushNotification.localNotification({
      title: 'Tweets Up',
      message: Tweets,
    });
  };
  render() {
    return (
      <Provider store={store}>
        <Tweets />
      </Provider>
    );
  }
}
export default App;
