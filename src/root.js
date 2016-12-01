import React, {Component} from 'react'
import {Actions, Router, Scene} from 'react-native-router-flux'
import {connect} from 'react-redux'
//import { skipLogin, asyncSkipLogin } from './actions/user';

import LoginPage from './scenes/login/login.scene';
import HomeScene from './scenes/home/home.scene';


class Root extends Component {
    constructor(props) {
        super(props);
        console.log("root:", this.props.isLoggedIn)
    }
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='LoginPage' component={LoginPage} hideNavBar={true} title='LoginPage'/>
                    <Scene key='HomeScene' component={HomeScene} hideNavBar={true} title='HomeScene' initial={true}/>
                </Scene>
            </Router>
        )
    }
}
// let select = store => ({isLoggedIn: store.userStore.isLoggedIn});
// export default connect(select)(Root);
export default Root;