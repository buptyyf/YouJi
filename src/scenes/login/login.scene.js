'use strict';
import React, {Component} from 'react';
import {Text, View,
Platform,
  TextInput,
  Image,
  AlertIOS,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import {logIn, skipLogin} from '../../actions/user';

import commonStyle from '../styles/common';
import loginStyle from './login.style';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            //username: 'sdf2316276',
            //password: '2316276',
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn) {
            Actions.MainPage();
        }
    }

    handleLogin(){
        if(!this.state.username || !this.state.password){
            AlertIOS.alert(
                 'username, password?'
            );
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister(){
        const {dispatch} = this.props;
        dispatch(skipLogin());
    }

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        return (
          <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
            <Image source={require('../../../assets/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.loginMainCon}>
                        <View style={loginStyle.comCulture}>
                            <Text style={commonStyle.textCenter}>Welcsss</Text>
                            <Text style={commonStyle.textCenter}>You are the best.</Text>
                        </View>
                        <View style={loginStyle.formStyle}>
                            <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                <Image source={require('../../../assets/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput
                                    ref="login_name"
                                    placeholder='username'
                                    style={loginStyle.loginInput}
                                    onChangeText={this.onChangeName.bind(this)} />
                            </View>
                            <View style={loginStyle.formInput}>
                                <Image source={require('../../../assets/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput
                                    ref="login_psw"
                                    style={loginStyle.loginInput}
                                    secureTextEntry={true}
                                    placeholder='password'
                                    onChangeText={this.onChangePswd.bind(this)} />
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <View style={loginStyle.forget}>
                                <View>
                                    <Image source={require('../../../assets/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                </View>
                                <View >
                                    <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                        <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn1} onPress={this.handleLogin.bind(this)}>Log in</Text>
                                <Text style={loginStyle.loginBtn2} onPress={this.handleRegister.bind(this)}>Skip</Text>
                        </View>
                    </View>


                </View>
            </Image>
          </View>
        );
    }
}



function select(store){
  return {
    isLoggedIn: store.userStore.isLoggedIn,
    user: store.userStore.user,
    status: store.userStore.status,
  }
}


export default connect(select)(LoginPage);


