/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import commonStyles from '../styles/common';
import Styles from './home.style'

import {logOut} from '../../actions/userAction';
import HomeIndexPage from './components/index-page/index-page.scene'
import UserScene from '../user/user.scene'

class HomeScene extends Component {

    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && !nextProps.isLoggedIn) {
            Actions.LoginPage();
        }
    }

    renderNavBar(){
        let {router, user, dispatch} = this.props;
        let leftButtonConfig = {
            title: 'Logout',
            handler: ()=>{
                dispatch(logOut());
            }
        };

        let titleConfig = {
            title: user.name || '',
        };
        return <NavigatorBar style={commonStyles.navbar}
                    title={titleConfig}
                    leftButton={leftButtonConfig}  />;
    }

    render() {
        let {user} = this.props;
        return (
        <View style={[Styles.main, commonStyles.wrapper]}>
            <ScrollableTabView 
                initialPage={0}
                renderTabBar={() => <DefaultTabBar />}
                tabBarPosition='bottom'
                >
                <HomeIndexPage tabLabel='首页'>My</HomeIndexPage>
                <Text tabLabel='最近'>favorite</Text>
                <Text tabLabel='发文'>project</Text>
                <UserScene tabLabel='我的'/>
            </ScrollableTabView>
        </View>
        )

    }
}


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      user: store.userStore.user,
  }
}


export default connect(select)(HomeScene);
