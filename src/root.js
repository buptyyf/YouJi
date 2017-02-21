import React, {Component} from 'react'
import {Actions, Router, Scene} from 'react-native-router-flux'
import {ToastAndroid} from 'react-native'
import {connect} from 'react-redux';
//import { skipLogin, asyncSkipLogin } from './actions/user';

import LoginPage from './scenes/login/login.scene';
import HomeScene from './scenes/home/home.scene';
import UserScene from './scenes/user/user.scene';
import TopicDetailScene from './scenes/topic/topic-detail.scene';
import TopicListScene from './scenes/topic/topic-list.scene';
import RemindListScene from './scenes/user/components/remind-list.scene';
import RemindDetailScene from './scenes/user/components/remind-detail.scene';

class Root extends Component {
    constructor(props) {
        super(props);
        //console.log("root:", this.props.isLoggedIn)
        this.lastPress = 0;
    }
    onExitApp = () => {
        let current = new Date().getTime()
        if (this.lastPress === 0 || current - this.lastPress > 2 * 1000) {
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
            this.lastPress = current
            return true
        }
        return false
    }

    render() {
        console.log("root render!!!!!")
        return (
            <Router onExitApp={this.onExitApp}>
                <Scene key='root' hideNavBar={true} duration={50}>
                    <Scene key='LoginPage' component={LoginPage} hideNavBar={true} title='LoginPage'/>
                    <Scene key='HomeScene' component={HomeScene} hideNavBar={true} title='HomeScene' initial={true}/>
                    <Scene key='UserScene' component={UserScene} hideNavBar={true} title='UserScene'/>
                    <Scene key='TopicListScene' component={TopicListScene} hideNavBar={true} title='TopicListScene'/>                    
                    <Scene key='TopicDetailScene' component={TopicDetailScene} hideNavBar={true} title='TopicDetailScene'/>
                    <Scene key='RemindListScene' component={RemindListScene} hideNavBar={true} title='RemindListScene'/>
                    <Scene key='RemindDetailScene' component={RemindDetailScene} hideNavBar={true} title='RemindDetailScene'/>
                </Scene>
            </Router>
        )
    }
}
// let select = store => ({isLoggedIn: store.userStore.isLoggedIn});
// export default connect(select)(Root);
export default Root;