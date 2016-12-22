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
        console.log("userScene", this.props.isLoggedIn, this.props.userInfo, this.props.currentUser);
        // let {userInfo, currentUser, dispatch, isLoggedIn} = this.props;
        // userId && !isLoggedIn ? dispatch(UserActions.getOtherUserInfoAction(userId)) : dispatch(UserActions.getSelfUserInfoAction()) 
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
        let {userInfo, currentUser, source} = this.props;
        //let isCurrentUser = userInfo.id === currentUser.id;
        //{currentUser.id && userInfo.id && userInfo.id === currentUser.id ? this.renderUserTopicInfo() : null}
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            {+source !== 0 ? <Narbar title={userInfo.id}/> : <Narbar title={userInfo.id} left={<View/>}/> }
            <View style={Styles.header}>
                <Image style={Styles.avatar} source={{uri: userInfo.face_url}} />
                <Text style={Styles.name}>{userInfo.user_name}</Text>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>生命值: {userInfo.life}</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>积分: {userInfo.score}</Text>
                </View>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>关注: {userInfo.follow_num}</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>粉丝: {userInfo.fans_num}</Text>
                </View>
            </View>
            {currentUser.id && userInfo.id && userInfo.id === currentUser.id ? this.renderUserTopicInfo() : null}
        </View>
        )

    }
}


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      currentUser: store.userStore.currentUser,
  }
}


export default connect(select)(UserScene);
