'use strict';
import React, {Component} from 'react';
import {Text, View,
Platform,
  TextInput,
  Image,
  Alert,
  WebView
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {UserActions} from '../../actions/userAction';
import { Line, Narbar } from '../../base-components';
import commonStyle from '../styles/common';
import Style from './login.style';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = "https://bbs.byr.cn/oauth2/authorize?response_type=token&client_id=70f870523c0b83419b4a0ea0d958908f&redirect_uri=https%3a%2f%2fgithub.com%2fbuptyyf%2fYouJi&state=35f7879b051b0bcb77a015977f5aeeeb";
class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: DEFAULT_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn) {
            Actions.HomeScene();
        }
    }

    // handleLogin(){
    //     if(!this.state.username || !this.state.password){
    //         AlertIOS.alert(
    //              'username, password?'
    //         );
    //         return;
    //     }
    //     let opt = {
    //         'name': this.state.username,
    //         'password': this.state.password,
    //     };
    //     console.log(this.props.dispatch);
    //     this.props.dispatch(UserActions.loginAction(opt));
    // }

    // handleRegister(){
    //     const {dispatch} = this.props;
    //     dispatch(UserActions.skipLoginAction());
    // }

    // onChangeName(text){
    //     this.setState({'username': text});
    // }

    // onChangePswd(text){
    //     this.setState({'password': text});
    // }


    // render(){
    //     return (
    //       <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
    //         <Image source={require('../../../assets/icons/bg.png')} style={{resizeMode: 'stretch'}}>
    //             <View style={loginStyle.loginMain}>
    //                 <View style={loginStyle.loginMainCon}>
    //                     <View style={loginStyle.comCulture}>
    //                         <Text style={commonStyle.textCenter}>Welcsss</Text>
    //                         <Text style={commonStyle.textCenter}>You are the best.</Text>
    //                     </View>
    //                     <View style={loginStyle.formStyle}>
    //                         <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
    //                             <Image source={require('../../../assets/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
    //                             <TextInput
    //                                 ref="login_name"
    //                                 placeholder='username'
    //                                 style={loginStyle.loginInput}
    //                                 onChangeText={this.onChangeName.bind(this)} />
    //                         </View>
    //                         <View style={loginStyle.formInput}>
    //                             <Image source={require('../../../assets/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
    //                             <TextInput
    //                                 ref="login_psw"
    //                                 style={loginStyle.loginInput}
    //                                 secureTextEntry={true}
    //                                 placeholder='password'
    //                                 onChangeText={this.onChangePswd.bind(this)} />
    //                         </View>
    //                         <View style={{alignItems: 'flex-end'}}>
    //                             <View style={loginStyle.forget}>
    //                             <View>
    //                                 <Image source={require('../../../assets/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
    //                             </View>
    //                             <View >
    //                                 <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
    //                             </View>
    //                             </View>
    //                         </View>
    //                     </View>
    //                     <View style={loginStyle.btnWrap}>
    //                             <Text style={loginStyle.loginBtn1} onPress={this.handleLogin.bind(this)}>Log in</Text>
    //                             <Text style={loginStyle.loginBtn2} onPress={this.handleRegister.bind(this)}>Skip</Text>
    //                     </View>
    //                 </View>


    //             </View>
    //         </Image>
    //       </View>
    //     );
    // }
    // getInitialState() {
    //     return {
    //     url: DEFAULT_URL,
    //     status: 'No Page Loaded',
    //     backButtonEnabled: false,
    //     forwardButtonEnabled: false,
    //     loading: true,
    //     scalesPageToFit: true,
    //     };
    // }

    onNavigationStateChange = (navState) => {
        console.log(3);
        console.log(navState);
        if(navState.url.match("access_token")) {
            console.log(1);
            let access_token = navState.url.match(/access_token\=(.*)?\&expires_in/)[1];
            console.log(access_token);
            this.props.dispatch(UserActions.loginAction(access_token));
            console.log(4)
            this.setState({
                url: navState.url,
            });
        }
    }
    renderNavBar(){
        let title = '登录';
        return <Narbar title={title}
                    left={(<Text>随便看看</Text>)}
                    onLeftPress={()=>{Actions.HomeScene()}}/>;
    }

    render() {
        return (
            <View style={Style.container}>
                {this.renderNavBar()}
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={!this.state.scalesPageToFit}
                    />
            </View>
        );
    }
}



function select(store){
  return {
    isLoggedIn: store.userStore.isLoggedIn,
  }
}


export default connect(select)(LoginPage);


