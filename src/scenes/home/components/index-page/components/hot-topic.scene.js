import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import Styles from './hot-topic.style';
import { TopicListActions } from '../../../../../actions/topicListAction';
import { Actions } from 'react-native-router-flux';

const icon = {
    comment: require('../../../../../../assets/icn_mine_huifu.png'),
    board: require('../../../../../../assets/icn_mine_group.png'),
};
export class HotTopicScene extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        //console.warn(this.props);
        this.props.dispatch(TopicListActions.topTenList());
    }
    goToTopicDetail(topicId, boardName) {
        //TODO 跳转到话题详情
        console.log(topicId, boardName);
        Actions.TopicDetailScene({topicId: topicId, boardName: boardName});
        //this.goToTopicDetail.bind(this, topic.id, topic.board_name)
    }
    topicListRender() {
        console.log("hot-topic topTenList: ", this.props.topTenList)
        return this.props.topTenList.map((topic, index)=>{
            if(topic.user) {
                return(
                    <TouchableHighlight underlayColor="#F2F2F2"
                        key={index}
                        onPress={() => {Actions.TopicDetailScene({topicId: topic.id, boardName: topic.board_name})}}
                        style={Styles.listCell}>
                        <View>
                            <View style={Styles.top}>
                                <Image source={icon.board} style={Styles.Icon}/>
                                <Text style={Styles.topText}>{topic.board_name}</Text>
                            </View>
                            <View style={Styles.middle}>
                                <Text style={Styles.middleText}>{topic.title}</Text>
                            </View>
                            <View style={Styles.bottom}>
                                <View style={Styles.bottomLeft}>
                                    <Text style={Styles.bottomLeftText}>{topic.user.id}</Text>
                                </View>
                                <View style={Styles.bottomRight}>
                                    <Image source={icon.comment} style={Styles.Icon}/>
                                    <Text style={Styles.bottomRightText}>{topic.reply_count}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                );
            }
        });
    }
    render() {
        return (
            <View style={Styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isFetching}
                            onRefresh={() => {
                                this.props.dispatch(TopicListActions.topTenList());
                            } }
                            />
                    } >
                    {this.topicListRender()}
                </ScrollView>
            </View>
        )
    }
}

function select(store){
    //console.warn(store.topicListStore);
    return {
        topTenList: store.topicListStore.topTenList,
        isFetching: store.topicListStore.isFetching,
    }
}
export default connect(select)(HotTopicScene);