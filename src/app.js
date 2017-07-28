import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import React from 'react';
import {
  View,
  Text
} from 'react-native';

import { StackNavigator } from 'react-navigation'

import msgsView from './views/message'
import test1View from './views/test1'
import usersView from './views/users'
import meView from './views/me'

class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello Worl1111d!</Text>
      </View>
    );
  }
}

export default StackNavigator({
  test1: { screen: test1View },
  users: { screen: usersView },
  messages: { screen: msgsView },
  me: { screen: meView },
});