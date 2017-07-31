// import './test1.scss'

import React from 'react'

import {
  View,
  Text,
  Button,
} from 'react-native';

import SOCKET from '../common/socketio'
// SOCKET.open();
// import SOCKET from '../common/socket'

class test1Page extends React.Component {
  static navigationOptions = {
    title: 'Test1 Page',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>
          test 1page
        </Text>
        <Button
          onPress={() => navigate('users')}
          title="聊天室成员"
        />
        <View
          style={{marginTop: 20}}
        >
          <Button
            onPress={() => navigate('messages')}
            title="聊天室"
          />
        </View>
        <View
          style={{marginTop: 20}}
        >
          <Button
            onPress={() => navigate('me')}
            title="我的"
          />
        </View>
      </View>
    );
  }
}

export default test1Page;