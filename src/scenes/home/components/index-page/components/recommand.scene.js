import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, WebView} from 'react-native'
import {connect} from 'react-redux';
import Styles from './hot-topic.style';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = "https://m.hupu.com/bbs/34";

export class RecommandScene extends Component {

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
    render() {
        return (
            <View style={Styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
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
    topicList: store.topicListStore.topicList,
    status: store.topicListStore.status,
  }
}
export default connect(select)(RecommandScene)