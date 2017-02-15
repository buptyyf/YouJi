import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux';
import Styles from './main-topic.style';
import { Actions } from 'react-native-router-flux';
import {TopicContent} from './topic-content/topic-content.component';
import {ReplyTopic} from './reply-topic.component'
import { Line, Narbar, DATE, getTry, roughDate } from '../../../base-components';

export class MainTopic extends Component {
    static propTypes = {
        article: React.PropTypes.object.isRequired,
        hotReply: React.PropTypes.array,
        source: React.PropTypes.number,//0表示来自文章详情，1表示来自我的提醒
    }
    constructor(props) {
        super(props);
        // this.dataSource = new ListView.DataSource({
        //     rowHasChanged: (r1, r2) => r1 !== r2,
        //     sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        // });
    }
    componentWillMount() {
        //this.props.dispatch(TopicActions.topTenList());
        //console.log(this.props.hotReply)
    }
    
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps,", nextProps.hotReply)
    //     if(nextProps.hotReply) {
    //         this.dataSource = this.dataSource.cloneWithRowsAndSections({
    //             hotReply: nextProps.hotReply
    //         });
    //     }
    // }
    renderHotReply() {
        //console.log("renderHotReply");
        return (
            <View>
                <View style={Styles.sectionHeader}>
                    <Line width={1} style={{ marginBottom: 10}}/>
                    <Text style={Styles.sectionText}>这些回复亮了</Text>
                    <Line width={1} style={{ marginTop: 10}}/>
                </View>
                {
                    this.props.hotReply.map((hotReply, index) => {
                        return <ReplyTopic article={hotReply} key={index}/>
                    })
                }
            </View>
        )
        // return (
        //     <ListView 
        //         initialListSize={10}
        //         dataSource={this.dataSource}
        //         renderSectionHeader={(sectionData, sectionID) => {
        //             console.log("sectionID", sectionID)
        //             if (sectionID === "hotReply") {
        //                 return (
        //                     <View style={Styles.sectionHeader}>
        //                         <Line width={1} style={{ marginBottom: 10}}/>
        //                         <Text style={Styles.sectionText}>这些评论亮了</Text>
        //                         <Line width={1} style={{ marginTop: 10}}/>
        //                     </View>
        //                 );
        //             }
        //         }}
        //         renderRow={(item, sectionID, rowID) => {
        //             return (<ReplyTopic article={item}/>)
        //         }}
        //         />
        // );
    }
    render() {
        const { article, hotReply, source } = this.props;
        //console.log(article.user.id)
        //console.log("hotReply: ", hotReply && hotReply.length !== 0 ? "true" : "false")
        //<TopicContent content={article.content}/>
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.headerLeft} 
                        onPress={() => Actions.UserScene({userInfo: article.user, source: 1})}
                        activeOpacity={0.8}>
                        <Image source={{uri: article.user.face_url}} 
                            style={Styles.userAvatar}/>
                        <Text style={Styles.userId}>{article.user.id}</Text>
                    </TouchableOpacity>
                    {+source === 0 ? <Text style={Styles.headerRight}>亮了({article.like_sum})</Text> : null}
                </View>
                <View style={Styles.body}>
                    <TopicContent article={article} source={"main"}/>
                </View>
                <View style={Styles.bottom}></View>
                {hotReply && hotReply.length !== 0 ? this.renderHotReply() : null}
                {
                    +source === 0 ? 
                    <View style={Styles.sectionHeader}>
                        <Line width={1} style={{marginBottom: 10}}/>
                        <Text style={Styles.sectionText}>全部回复</Text>
                        <Line width={1} style={{marginTop: 10}}/>
                    </View> : null
                }
            </View>
        )
    }
}
