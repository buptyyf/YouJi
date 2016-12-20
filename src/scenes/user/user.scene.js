/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
//import NavigatorBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import commonStyles from '../styles/common';
import Styles from './user.style';

import { UserActions } from '../../actions/userAction';
import { Line, Narbar } from '../../base-components';
//import HomeIndexPage from './components/index-page/index-page.scene'


class UserScene extends Component {

    constructor(props){
        super(props);
    }
    componentWillMount() {
        let {user, currentUser, userId, dispatch} = this.props;
        console.log(userId);
        userId ? dispatch(UserActions.getOtherUserInfoAction(userId)) : dispatch(UserActions.getSelfUserInfoAction()) 
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && !nextProps.isLoggedIn) {
            Actions.LoginPage();
        }
    }
    goToActivity() {
        //TODO
    }
    handleQuit() {
        this.props.dispatch(UserActions.logOutAction());
    }

    renderUserTopicInfo() {
        return (
            <View style={Styles.body}>
                <TouchableOpacity onPress={this.goToActivity.bind(this, 'publish')}
                    style={[Styles.centerLinkContainer, { marginTop: 30 }]}>
                    <View style={Styles.centerLinkLeft}>
                        <Text style={Styles.centerLinkTitle}>@我的</Text>
                    </View>
                </TouchableOpacity>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <TouchableOpacity onPress={this.goToActivity.bind(this, 'publish')}
                    style={[Styles.centerLinkContainer, { marginTop: 30 }]}>
                    <View style={Styles.centerLinkLeft}>
                        <Text style={Styles.centerLinkTitle}>我的信箱</Text>
                    </View>
                </TouchableOpacity>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <TouchableOpacity onPress={this.goToActivity.bind(this, 'publish')}
                    style={[Styles.centerLinkContainer, { marginTop: 30 }]}>
                    <View style={Styles.centerLinkLeft}>
                        <Text style={Styles.centerLinkTitle}>回复我的</Text>
                    </View>
                </TouchableOpacity>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <TouchableOpacity onPress={this.handleQuit.bind(this)}
                    style={[Styles.centerLinkContainer, { marginTop: 30 }]}>
                    <View style={Styles.centerLinkLeft}>
                        <Text style={Styles.centerLinkTitle}>退出账号</Text>
                    </View>
                </TouchableOpacity>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
            </View>
        
        );
    }

    render() {
        let {user, currentUser, userId} = this.props;
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            {userId ? <Narbar title={user.id}/> : <Narbar title={user.id} left={<View/>}/> }
            <View style={Styles.header}>
                <Image style={Styles.avatar} source={{uri: user.face_url}} />
                <Text style={Styles.name}>{user.user_name}</Text>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>生命值: {user.life}</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>积分: {user.score}</Text>
                </View>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>关注: {user.follow_num}</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>粉丝: {user.fans_num}</Text>
                </View>
            </View>
            {currentUser.id && user.id && user.id === currentUser.id ? this.renderUserTopicInfo() : null}
        </View>
        )

    }
}


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      currentUser: store.userStore.currentUser,
      user: store.userStore.user,
  }
}


export default connect(select)(UserScene);
