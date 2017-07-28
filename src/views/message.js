// import s from  './message.scss'

import React from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { NavBar } from 'antd-mobile'
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native'

import MdChildCare from 'react-icons/lib/md/child-care'
import TiUser from 'react-icons/lib/ti/user'

import _ from 'lodash'
import moment from 'moment'

import history from '../common/history'
import cache from '../common/cache'
import constants from '../common/constants'
import SOCKET from '../common/socketio'

import Message from '../services/message'
// import Text from "antd-mobile/lib/text/index.web.d";


class MessagePage extends React.Component {

  static navigationOptions = {
    title: 'itech+聊天室',
  };

  constructor(props){
    super(props);

    this.state = {
      msgs: [],
    };

    this.handleSendMsg = this.handleSendMsg.bind(this);
    this.scrollMsgContaner = this.scrollMsgContaner.bind(this);
  }

  componentDidMount(){
    // 获取消息
    Message.fetchMessages().then(msgs => {
      // console.log(msgs);
      this.setState({
        msgs: msgs || [],
      }, this.scrollMsgContaner);
    }).catch(e => {
      console.error(e);
      // todo
    });

    // 当前用户ID
    cache.get(constants.X_USER_ID).then(userId => {
      this.currentUserId = userId;
    }, err => {
      console.log('获取用户ID缓存失败', err);
    });

    // 监听消息
    SOCKET.onOnce(`${constants.MSG_CODE.MESSAGE}-msgs`, (newMsg) => {
      const { msgs } = this.state;
      msgs.push(newMsg);
      this.setState({ msgs }, this.scrollMsgContaner);
    });
  }

  scrollMsgContaner() {

    // todo
    // this.msgContainer.scrollTop = 20000;
  }

  handleSendMsg(e) {
    if(e.key !== 'Enter') return;

    console.log(this.state.search);
    Message.sendMessage({
      content: this.state.search,
      senderId: this.currentUserId, //消息发送人ID
    }).then(fMsg => {
      // this.state.msgs.push();
      this.setState({
        search: '',
      });
    }).catch(e => {
      console.error(e);
      // todo
    });
  }



  render() {
    return (
      <View style={styles.messageContainer} className="display-flex message-container">

        {this.renderMessages2()}

        {this.renderMessageOpt()}
      </View>
    );
  }

  renderMessages() {
    const {msgs} = this.state;

    if(_.isEmpty(msgs)){
      return <View className="flex-1"><Text>暂无聊天内容</Text></View>;
    }

    return (
      <View className="msg-container flex-1 pt-40 pb-10" ref={ref => {
        this.msgContainer = ref;
      }}>
        {msgs.map((msg, index) => {
          const {url, senderId, content, senderName, createTime} = msg;

          return (
            <View key={index} className="display-flex msg-item mb-20">
              {/* 头像 昵称 内容 */}
              <Image source={{uri: url}}  style={{width: 40, height: 40, borderRadius: 20}}/>
              <View className="ml-10 flex-1">
                <View className="display-flex flex-justify-content-between">
                  <Text>{senderName}</Text>
                  <Text className="color-text-slight fz-20">{moment(createTime).format('MM-DD hh:MM:ss')}</Text>
                </View>
                <View className="item-content mt-15">
                  <Text>{content}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  renderMessages2(){
    const {msgs} = this.state;

    if(_.isEmpty(msgs)){
      return <View className="flex-1"><Text>暂无聊天内容</Text></View>;
    }

    return (
      <View style={styles.msgWrap}>
        <FlatList
          data={msgs}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => item.messageId;

  _renderListItem = ({item: msg, index}) => {
    const {url, senderId, content, senderName, createTime} = msg;

    return (
      <View style={styles.msgItem} >
        {/* 头像 昵称 内容 */}
        <Image source={{uri: url}}   style={styles.msgItemImg}/>
        <View style={styles.msgItemInfo}>
          <View style={styles.msgItemInfo1} className="display-flex flex-justify-content-between">
            <Text style={styles.msgItemName}>{senderName}</Text>
            <Text className="color-text-slight fz-20">{moment(createTime).format('MM-DD hh:MM:ss')}</Text>
          </View>
          <View style={styles.itemItemContent} className="item-content mt-15">
            <Text style={styles.itemItemContentTxt}>{content}{content}{content}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderMessageOpt() {
    return (
      <View>
        <TextInput
          type="text"
          className="display-block"
          onKeyPress={this.handleSendMsg}
          value={this.state.search || ''}
          onChangeText={e => {
            this.setState({search: e.target.value});
          }}/>
      </View>
    );
  }
}

const styles = {
  msgWrap: {
    // paddingTop: 20,
    // paddingBottom: 10,
  },
  msgItem: {
    flexDirection: 'row',
    marginTop: 20,
  },
  msgItemImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginLeft: 20,
    marginRight: 10,
  },
  msgItemInfo: {
    flex: 1,
    marginRight: 20,
  },
  msgItemInfo1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msgItemName: {
    color: '#333',
    fontSize: 14,
  },
  itemItemContent: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  itemItemContentTxt: {
    // lineHeight: 0,
  }
};

export default MessagePage;
// export default withStyles(s)(MessagePage);