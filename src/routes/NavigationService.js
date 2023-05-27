import {CommonActions, StackActions} from '@react-navigation/native';
import {BackHandler, Platform, ToastAndroid} from 'react-native';

let _navigator;
let currentCount = 0;

const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

const navigate = (name, params) => {
  if (!_navigator) {
    return;
  }

  _navigator.dispatch(CommonActions.navigate({name, params}));
};

const push = (name, params) => {
  if (!_navigator) {
    return;
  }

  _navigator.dispatch(StackActions.push(name, {...params}));
};

const doubleBackPressExit = () => {
  if (Platform.OS === 'ios') {
    return true;
  }

  if (currentCount === 1) {
    BackHandler.exitApp();
    return true;
  }

  if (currentCount < 1) {
    currentCount += 1;
    ToastAndroid.show('Press again to close!', ToastAndroid.SHORT);

    setTimeout(() => {
      currentCount = 0;
    }, 2000);

    return true;
  }
};

const back = (index = 1) => {
  if (!_navigator) {
    return;
  }
  if (!_navigator.canGoBack()) {
    doubleBackPressExit(true);
    return;
  }
  while (index) {
    _navigator.dispatch(CommonActions.goBack());
    index--;
  }
};

const resetStack = routes => {
  if (!_navigator) {
    return;
  }

  _navigator.dispatch(CommonActions.reset({index: routes.length - 1, routes}));
};

export default {
  push,
  navigate,
  back,
  setTopLevelNavigator,
  doubleBackPressExit,
  resetStack,
};
