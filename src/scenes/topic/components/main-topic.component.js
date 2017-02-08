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
        console.log(this.props.hotReply)
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
        console.log("renderHotReply");
        return (
            <View>
                <View style={Styles.sectionHeader}>
                    <Line width={1} style={{ marginBottom: 10}}/>
                    <Text style={Styles.sectionText}>这些评论亮了</Text>
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
        const { article, hotReply } = this.props;
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
                    <Text style={Styles.headerRight}>亮了({article.like_sum})</Text>
                </View>
                <View style={Styles.body}>
                    <TopicContent article={article} source={"main"}/>
                </View>
                <View style={Styles.bottom}></View>
                {hotReply && hotReply.length !== 0 ? this.renderHotReply() : null}
                <View style={Styles.sectionHeader}>
                    <Line width={1} style={{marginBottom: 10}}/>
                    <Text style={Styles.sectionText}>全部评论</Text>
                    <Line width={1} style={{marginTop: 10}}/>
                </View>
            </View>
        )
    }
}
