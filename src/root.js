import React, {Component} from 'react'
import {Actions, Router, Scene} from 'react-native-router-flux'
import {connect} from 'react-redux'
//import { skipLogin, asyncSkipLogin } from './actions/user';

import LoginPage from './scenes/home/login.scene';
import MainPage from './scenes/home/home.scene';


class Root extends Component {
    constructor(props) {
        super(props);
        console.log("root:", this.props.isLoggedIn)
    }
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='LoginPage' component={LoginPage} hideNavBar={true} title='LoginPage' initial={!this.props.isLoggedIn}/>
                    <Scene key='MainPage' component={MainPage} hideNavBar={true} title='MainPage' initial={this.props.isLoggedIn}/>
                </Scene>
            </Router>
        )
    }
}
let select = store => ({isLoggedIn: store.userStore.isLoggedIn});
export default connect(select)(Root);