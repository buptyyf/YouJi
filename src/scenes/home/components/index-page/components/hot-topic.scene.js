import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import Styles from './hot-topic.style';
import { TopicListActions } from '../../../../../actions/topicListAction';
import { TopicListCell } from '../../../../topic/components/topic-list-cell.component';
import { Actions } from 'react-native-router-flux';

const icon = {
    comment: require('../../../../../../assets/icn_mine_huifu.png'),
    board: require('../../../../../../assets/icn_mine_group.png'),
};
export class HotTopicScene extends Component {
    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        topTenList: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

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
            return <TopicListCell topic={topic} key={index}/>
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
        isFetching: store.topicListStore.isFetchingTopTen,
    }
}
export default connect(select)(HotTopicScene);