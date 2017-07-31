import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import { StackNavigator } from 'react-navigation'

import msgsView from '../views/message'
import test1View from '../views/test1'
import usersView from '../views/users'
import meView from '../views/me'

export default StackNavigator({
  messages: { screen: msgsView },
  test1: { screen: test1View },
  users: { screen: usersView },
  me: { screen: meView },
});