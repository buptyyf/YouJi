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
        if(!this.props.isLoggedIn) {
            console.log("没登录呢！");
            Actions.LoginPage();
        } else {
            // let opt = {};
            // if(this.props.accessToken) {
            //     let opt = {oauth_token: this.props.accessToken};
            // }
            this.props.dispatch(UserActions.getUserInfoAction());
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && !nextProps.isLoggedIn) {
            Actions.LoginPage();
        }
    }
    goToActivity() {
        //TODO
    }

    renderNavBar(){
        let {user, dispatch} = this.props;

        let title = user.id || '个人信息';
        return <Narbar title={title}
                    onLeftPress={()=>{dispatch(UserActions.logOutAction())}}/>;
    }

    render() {
        let {user} = this.props;
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            {this.renderNavBar()}
            <View style={Styles.header}>
                <Image style={Styles.avatar} source={{uri: user.face_url}} />
                <Text style={Styles.name}>{user.user_name}</Text>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>生命值：21323</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>生命值：21323</Text>
                </View>
                <View style={Styles.otherInfo}>
                    <Text style={Styles.otherInfoText}>积分值：21323</Text>
                    <Line width={1}
                        vertical={true}
                        style={{ marginLeft: 10, marginRight: 10, height: 15 }}
                        color="#333" />
                    <Text style={Styles.otherInfoText}>积分值：21323</Text>
                </View>
            </View>
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
            </View>
        </View>
        )

    }
}


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      user: store.userStore.user,
      accessToken: store.userStore.accessToken
  }
}


export default connect(select)(UserScene);
