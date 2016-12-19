import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image} from 'react-native'
import {connect} from 'react-redux';
import Styles from './main-topic.style';
import {TopicContent} from './topic-content/topic-content.component';
import {ReplyTopic} from './reply-topic.component'
import { Line, Narbar, DATE, getTry, roughDate } from '../../../base-components';

export class MainTopic extends Component {

    componentWillMount() {
        //this.props.dispatch(TopicActions.topTenList());
    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    componentWillReceiveProps(nextProps) {
        if(nextProps.hotReply) {
            this.dataSource = this.dataSource.cloneWithRowsAndSections({
                hotReply: nextProps.hotReply
            });
        }
    }
    renderHotReply() {
        //console.warn("hotreply");
        //console.log(this.dataSource);
        return(
            <ListView 
                initialListSize={10}
                dataSource={this.dataSource}
                renderSectionHeader={(sectionData, sectionID) => {
                    //console.log(sectionID)
                    if (sectionID === "hotReply") {
                        return (
                            <View style={Styles.sectionHeader}>
                                <Line width={1} style={{ marginBottom: 10}}/>
                                <Text style={Styles.sectionText}>这些评论亮了</Text>
                                <Line width={1} style={{ marginTop: 10}}/>
                            </View>
                        );
                    }
                }}
                renderRow={(item, sectionID, rowID) => {
                    return (<ReplyTopic article={item}/>)
                }}
                />
        );
    }
    render() {
        const { article, hotReply } = this.props;
        //<TopicContent content={article.content}/>
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <View style={Styles.headerLeft}>
                        <Image source={{uri: article.user.face_url}} style={Styles.userAvatar}/>
                        <Text style={Styles.userId}>{article.user.id}</Text>
                    </View>
                    <Text style={Styles.headerRight}>亮了({article.like_sum})</Text>
                </View>
                <View style={Styles.body}>
                    <TopicContent article={article} />
                </View>
                <View style={Styles.bottom}></View>
                {hotReply ? this.renderHotReply() : null}
                <View style={Styles.sectionHeader}>
                    <Line width={1} style={{marginBottom: 10}}/>
                    <Text style={Styles.sectionText}>全部评论</Text>
                    <Line width={1} style={{marginTop: 10}}/>
                </View>
            </View>
        )
    }
}
