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
import RecommandScene from './components/recommand.scene';


export default class HomeIndexPage extends Component {

    static propTypes = {
    }
    
    constructor(props){
        super(props);
        console.log(props)
    }
    componentWillReceiveProps(nextProps) {
    }

    boardList() {
        //TODO 转到选择页
        console.warn('board list!');
    }

    render() {
        //let {user} = this.props;
        return (
        <View style={[Styles.container, commonStyles.wrapper]}>
            <ScrollableTabView 
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={Styles.tabBar}/>}
                tabBarTextStyle={Styles.tabBarText}
                >
                    <HotTopicScene tabLabel='十大热门' />
                    <RecommandScene tabLabel='最新推荐'/>
            </ScrollableTabView>
            <View style={Styles.boardButton}>
                <Text style={Styles.boardText} onPress={this.boardList.bind(this)}>＋</Text>
            </View>
        </View>
        )

    }
}
