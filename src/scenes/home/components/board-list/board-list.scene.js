/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native'
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import Styles from '../index-page/index-page.style';
import BoardScene from '../../../board/board.scene';
import FollowedBoardScene from '../../../board/followed-board.scene';
import {STATIC} from '../../../../base-components'


class BoardListScene extends Component {

    constructor(props){
        super(props);
        console.log(props)
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        let {isLoggedIn} = this.props;
        return (
        <View style={[Styles.container]}>
            {isLoggedIn ? (
                <ScrollableTabView 
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar style={Styles.tabBar}/>}
                    tabBarTextStyle={Styles.tabBarText}
                    >
                        <BoardScene tabLabel='全部版面' />
                        <FollowedBoardScene tabLabel='我的关注'/>
                </ScrollableTabView>) : (
                <View style={[Platform.OS === "ios" ? {marginTop: STATIC.STATUS_BAR_HEIGHT} : {marginTop: 0}, {flex: 1}]}>
                    <BoardScene />
                </View>
            )}
            
        </View>
        )

    }
}
function select(store){
    //console.log(store);
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        //currentUser: store.userStore.currentUser,
    }
}

export default connect(select)(BoardListScene);
