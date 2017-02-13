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

import {UserActions} from '../../../../actions/userAction';
import { Line, Narbar } from '../../../../base-components';
import Styles from './test.style';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = "http://m.byr.cn/";
class TestPage extends Component{

    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            url: DEFAULT_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }
    componentWillMount() {
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn) {
        //     Actions.pop();
        // }
    }
    renderNavBar(){
        let title = '北邮人论坛';
        return <Narbar title={title}
                    left={(<Text></Text>)}
                    onLeftPress={()=>{}}/>;
    }
    onNavigationStateChange = (navState) => {
        console.log(navState.url)
        if(navState.url !== "http://m.byr.cn/user/login") {
            this.setState({
                backButtonEnabled: navState.canGoBack,
                forwardButtonEnabled: navState.canGoForward,
                url: navState.url,
                status: navState.title,
                loading: navState.loading,
                scalesPageToFit: true
            });
        }
    };
    render() {
        return (
            <View style={Styles.container}>
                {this.renderNavBar()}
                <Text selectable={true}>sdfsdfsdfdsfdsfsdfdsfdsfsdfsdfsdfdsdsfsdf塑料袋快捷方式的看法就是代理费送到附近上岛咖啡水电费收到发上岛咖啡就是的开了房 dsfsdfsdfdsfdsfdsf</Text>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    scalesPageToFit={this.state.scalesPageToFit}
                    />
            </View>
        );
    }
}

export default connect()(TestPage);


