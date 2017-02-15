/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux';
//import NavigatorBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import commonStyles from '../styles/common';
import Styles from './user.style';

import { UserActions } from '../../actions/userAction';
import { RemindActions } from '../../actions/remindAction'
import { Line, Narbar, Avatar } from '../../base-components';
//import HomeIndexPage from './components/index-page/index-page.scene'

const icon = {
    f: require('../../../assets/icn_mine_nv_s.png'),
    m: require('../../../assets/icn_mine_nan_s.png'),
};
class UserScene extends Component {

    static propTypes = {
        isLoggedIn: React.PropTypes.bool.isRequired,
        currentUser: React.PropTypes.object.isRequired,
        userInfo: React.PropTypes.object.isRequired,
        source: React.PropTypes.number.isRequired, //0表示从首页的tab中来，1表示从非首页跳转来的
        dispatch: React.PropTypes.func.isRequired,
    }
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

    goToActivity(type) {
        if (type === "at" || type === "reply") {
            this.props.dispatch(RemindActions.getRemindInfoAction("refer", type));
        } else if (type === "inbox" || type === "outbox" || type === "deleted") {
            this.props.dispatch(RemindActions.getRemindInfoAction("mail", type));
        } else if(type === "collection"){
            this.props.dispatch(RemindActions.getRemindInfoAction("collection"));
        }
        Actions.RemindListScene({remindType: type});
    }

    handleQuit() {
        this.props.dispatch(UserActions.logOutAction());
    }

    renderUserTopicInfo() {
        return (
            <ScrollView style={Styles.body}>
                <View style={Styles.rowCell}>
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'at')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>@我的</Text>
                        </View>
                    </TouchableOpacity>
                    <Line width={1} vertical={true} style={{ height: 25 }} />
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'reply')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>回复我的</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <View style={Styles.rowCell}>
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'inbox')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>收件箱</Text>
                        </View>
                    </TouchableOpacity>
                    <Line width={1} vertical={true} style={{ height: 25 }} />
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'outbox')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>发件箱</Text>
                        </View>
                    </TouchableOpacity>
                    <Line width={1} vertical={true} style={{ height: 25 }} />
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'deleted')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>回收站</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <View style={Styles.rowCell}>
                    <TouchableOpacity onPress={this.goToActivity.bind(this, 'collection')}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>收藏文章</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
                <View style={Styles.rowCell}>
                    <TouchableOpacity onPress={this.handleQuit.bind(this)}
                        style={[Styles.centerLinkContainer]}>
                        <View style={Styles.centerLinkLeft}>
                            <Text style={Styles.centerLinkTitle}>退出账号</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Line width={1} style={{ marginLeft: 16, marginRight: 16 }} />
            </ScrollView>
        );
    }

    render() {
        let {userInfo, currentUser, source} = this.props;
        console.log(typeof(icon.f))
        //let isCurrentUser = userInfo.id === currentUser.id;
        //{currentUser.id && userInfo.id && userInfo.id === currentUser.id ? this.renderUserTopicInfo() : null}
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            {+source !== 0 ? <Narbar title={userInfo.id}/> : <Narbar title={userInfo.id} left={<View/>}/> }
            <View style={Styles.header}>
                <Avatar uri={userInfo.face_url} gender={userInfo.gender} size={100}/>
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
