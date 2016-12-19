import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image} from 'react-native'
import {connect} from 'react-redux';
import Styles from './reply-topic.style';
import {TopicContent} from './topic-content/topic-content.component';
import { Line, Narbar, DATE, getTry, roughDate } from '../../../base-components';

export class ReplyTopic extends Component {

    componentWillMount() {
        //this.props.dispatch(TopicActions.topTenList());
    }
    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        const { article } = this.props;
        let postTime = roughDate(article.post_time);
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <View style={Styles.headerLeft}>
                        <Image source={{uri: article.user.face_url}} style={Styles.userAvatar}/>
                        <View>
                            <View style={Styles.headerLeftTop}>
                                <Text style={Styles.userId}>{article.user.id}</Text>
                                {this.props.isMainUser ? (
                                    <View style={Styles.mainUser}>
                                        <Text style={Styles.mainUserText}>楼主</Text>
                                    </View>
                                ) : null}
                            </View>
                            <View style={Styles.positionTime}>
                                <Text style={Styles.postTime}>{article.position}楼</Text>
                                <Text style={Styles.postTime}>{postTime}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={Styles.headerRight}>亮了({article.like_sum})</Text>
                </View>
                <View style={Styles.body}>
                    <TopicContent article={article} />
                </View>
                <View style={Styles.bottom}></View>
                <Line width={1} />
            </View>
        )
    }
}
