// import './users.scss'

import React from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native';

import history from '../common/history';
import User from '../services/user';


class UserInfoPage extends React.Component {

  static navigationOptions = {
    title: '聊天室成员',
  };

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    User.fetchUsers().then(users => {
      this.setState({ users });
    }, err => {
      console.error(err);
    });
  }

  render() {
    return (
      <View>
        {this.renderUserList()}
      </View>
    );
  }

  renderUserList() {
    const { users } = this.state;

    return (
      <View style={styles.usersContainer}>
        {users.map((user, index) => {
          const { url, name } = user;
          return (
            <View key={index} style={styles.userItem} className="user-item display-flex msg-item mb-20">
              {/* 头像 昵称 内容 */}
              <Image source={{uri: url}} style={styles.userItemImg} />
              <View className="ml-10 flex-1">
                <View className="display-flex flex-justify-content-between">
                  <Text>{name}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = {
  usersContainer: {
    padding: 20,
  },
  userItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  userItemImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  }
};

export default UserInfoPage;