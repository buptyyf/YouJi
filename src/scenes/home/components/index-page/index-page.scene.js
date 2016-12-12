/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import commonStyles from '../../../styles/common';
import Styles from './index-page.style';
import HotTopicScene from './components/hot-topic.scene';



class HomeIndexPage extends Component {

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
    boardList() {
        //TODO 转到选择页
        console.warn('board list!');
    }

    render() {
        let {user} = this.props;
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            <ScrollableTabView 
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={Styles.tabBar}/>}
                tabBarTextStyle={Styles.tabBarText}
                >
                    <HotTopicScene tabLabel='十大热门' />
                    <Text tabLabel='最新推荐'>favorite</Text>
            </ScrollableTabView>
            <View style={Styles.boardButton}>
                <Text style={Styles.boardText} onPress={this.boardList.bind(this)}>＋</Text>
            </View>
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


export default connect(select)(HomeIndexPage);
