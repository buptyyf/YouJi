/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import commonStyles from '../styles/common';
import Styles from './home.style';

import {TabBar} from './components/tab-bar/tab-bar.component';
import {logOut} from '../../actions/userAction';
import HomeIndexPage from './components/index-page/index-page.scene'
import UserScene from '../user/user.scene'

class HomeScene extends Component {

    constructor(props){
        super(props);
    }
    tabInfo = [
        { text: '首页', showRedDot: false, icon: require('../../../assets/bar_icon_home.png'), activeIcon: require('../../../assets/bar_icon_home_active.png')},
        { text: '最近', showRedDot: false, icon: require('../../../assets/bar_icon_discover.png'), activeIcon: require('../../../assets/bar_icon_discover_active.png')},
        { text: '发文', showRedDot: false, icon: require('../../../assets/bar_icon_write.png'), activeIcon: require('../../../assets/bar_icon_write_active.png')},
        { text: '我的', showRedDot: false, icon: require('../../../assets/bar_icon_user.png'), activeIcon: require('../../../assets/bar_icon_user_active.png')},
    ];
    currentIndex = 0;
    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && !nextProps.isLoggedIn) {
            Actions.LoginPage();
        }
    }

    render() {
        let {currentUser, isLoggedIn} = this.props;
        return (
        <View style={[Styles.main, commonStyles.wrapper]}>
            <ScrollableTabView 
                initialPage={0}
                locked={true}
                renderTabBar={() => <TabBar tabInfo={this.tabInfo} onClick={(i) => {
                    this.currentIndex = i;
                    let jump = true;
                    switch (i) {
                        case 1:
                            break;
                        case 2:
                            break;
                        case 3:
                            if(!isLoggedIn) {
                                Actions.LoginPage();
                                jump = false;
                            }
                        default:
                            break;
                    }
                    return jump;
                }}/>}
                tabBarPosition='bottom'
                >
                <HomeIndexPage />
                <Text tabLabel='最近'>favorite</Text>
                <Text tabLabel='发文'>project</Text>
                <UserScene userInfo={currentUser} source={0}/>
            </ScrollableTabView>
        </View>
        )

    }
}


function select(store){
    //console.log(store);
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        currentUser: store.userStore.currentUser,
    }
}


export default connect(select)(HomeScene);
