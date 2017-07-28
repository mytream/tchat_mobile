// import './me.scss'

import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
} from 'react-native';
import { connect } from 'react-redux'
// import User from '../services/user'


import { getCurrentUser, setCurrentUser, updateUser } from '../store/user/actions';


// import history from '../common/history'

class MePage extends React.Component {

  static navigationOptions = {
    title: '我的',
  };
  
  constructor(props){
    super(props);

    this.state = {
      userInfo: {},
    };

    this.handleSaveUser = this.handleSaveUser.bind(this);
  }

  componentDidMount(){
    return;

    this.props.dispatch(getCurrentUser());
    // User.getCurrentUser().then(userInfo =>{
    //   this.setState({userInfo});
    // })
  }

  handleSaveUser(){
    console.log('newUser', this.state.userInfo);
    // User.updateUser(this.state.userInfo).then(() => {
    //   Toast.success('用户信息保存成功');
    // }, err => {
    //   console.error(err);
    // });
    this.props.dispatch(updateUser(this.props.userInfo)).then(() => {
        Toast.success('用户信息保存成功');
    }, err => {
        console.error(err);
    });
  }

  render() {

    this.styles = {
      meContainer: {
        padding: 20,
      }
    };
    let {styles} = this;

    return (
      <View style={styles.meContainer} className="me-container">
        {this.renderUserInfo()}
        {this.renderUserInfoEdit()}
      </View>
    );
  }

  renderUserInfoEdit(){
    if(!this.state.editable){
      return null;
    }

    // const {userInfo} = this.props;

    // todo:
    const userInfo = {"_id":"5974b5e9a63a41c534f13473","userId":1500820969277,"name":"那年此时3333","url":"http://media.boingboing.net/wp-content/uploads/2016/06/bbb22_576967691500002f001ba92f.jpeg.jpg","deleted":true,"order":0,"online":true,"__v":0};

    const { name, url } = userInfo;


    return (
      <View>
        <TextInput value={name || ''} onChangeText={e => {
          userInfo.name = e.target.value;
          // this.setState({userInfo});
          this.forceUpdate();
        }} />

        <TextInput value={url || ''} onChange={e => {
          userInfo.url = e.target.value;
          // this.setState({userInfo});
          this.forceUpdate();
        }} />
        <Button
          className="btn btn-primary"
          onPress={this.handleSaveUser}
          title="确认修改"
        />
      </View>
    );
  }

  renderUserInfo(){

    if(this.state.editable){
      return null;
    }

    // const {userInfo} = this.props;

    // todo:
    const userInfo = {"_id":"5974b5e9a63a41c534f13473","userId":1500820969277,"name":"那年此时3333","url":"http://media.boingboing.net/wp-content/uploads/2016/06/bbb22_576967691500002f001ba92f.jpeg.jpg","deleted":true,"order":0,"online":true,"__v":0};

    const { name, url } = userInfo;

    return (
      <View style={{marginTop: 20}}>
        <Image source={{uri: url}} style={{width: 100, height: 100, borderRadius: 50}}/>

        <View>
          <Text>{name}</Text>
        </View>

        <View>
          <Button
            className="btn btn-primary"
            onPress={() => {this.setState({editable: true})}}
            title="编 辑"
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

// export default connect(mapStateToProps)(MePage);

export default MePage;