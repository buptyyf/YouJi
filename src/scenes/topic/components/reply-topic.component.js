import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native'
import {connect} from 'react-redux';
import Styles from './reply-topic.style'


export class ReplyTopic extends Component {

    componentWillMount() {
        //this.props.dispatch(TopicActions.topTenList());
    }
    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        return (
            <View style={Styles.wrapper}>
                <Text>{this.props.article.content}</Text>
            </View>
        )
    }
}
