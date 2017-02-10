import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import Styles from './topic-list.style';
import { TopicListActions } from '../../actions/topicListAction';
import { Actions } from 'react-native-router-flux';
import { Line, Narbar, getTry } from '../../base-components';
import {TopicListCell} from './components/topic-list-cell.component'

const icon = {
    comment: require('../../../assets/icn_mine_huifu.png'),
    board: require('../../../assets/icn_mine_group.png'),
};
export class TopicListScene extends Component {
    static propTypes = {
        boardName: React.PropTypes.string.isRequired,
        boardDescription: React.PropTypes.string.isRequired,
        pageInfo: React.PropTypes.object.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        topicList: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    componentWillMount() {
        //console.warn(this.props);
        //this.props.dispatch(TopicListActions.topTenList());
    }
    componentWillReceiveProps(nextProps) {
        //console.log("!!!!!!!");
        //console.log(nextProps.topic.article);
        if(this.props.topicList !== nextProps.topicList) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.topicList);
        }
    }
    goToTopicDetail(topicId, boardName) {
        //TODO 跳转到话题详情
        console.log(topicId, boardName);
        Actions.TopicDetailScene({topicId: topicId, boardName: boardName});
    }
    topicListRender(topic) {
        return (<TopicListCell topic={topic}/>)
    }
    render() {
        let {dispatch, boardName, pageInfo, topicList, isFetching, boardDescription} = this.props;
        // console.log("topicList Render", boardDescription, boardName);
        // console.log("topicList pageInfo:", pageInfo);
        let hasMore = pageInfo.page_current_count < pageInfo.page_all_count;
        return (
            <View style={Styles.container}>
                <Narbar title={boardDescription} />
                <ListView
                    initialListSize={10}
                    dataSource={this.dataSource}
                    renderRow={(item, sectionID, rowID) => 
                        this.topicListRender(item, sectionID, rowID)
                    }
                    renderFooter={() => {
                        return (
                            <View style={Styles.listViewFooter}>
                                {
                                    isFetching ? <Text style={Styles.footerText}>加载中...</Text>
                                        : (getTry(() => topicList.length < 1) ?
                                            <View style={Styles.nodata}>
                                                <Text style={Styles.nodataText}>无法获取数据/出错啦！</Text>
                                            </View>
                                            : <Text style={Styles.footerText}>没有更多内容</Text>)
                                }
                            </View>
                        )
                    } }
                    onEndReached={() => {
                        if (!isFetching && hasMore && topicList.length > 0) {
                            //console.log('new fetch！！！！！ ', data.page)
                            dispatch(TopicListActions.getTopicList(boardName, { page: pageInfo.page_current_count + 1, count: 10 }));
                        }
                    } }
                    onEndReachedThreshold={10}/>
            </View>
        )
    }
}

function select(store){
    //console.warn(store.topicListStore);
    return {
        boardName: store.topicListStore.boardName,
        pageInfo: store.topicListStore.pageInfo,
        topicList: store.topicListStore.topicList,
        isFetching: store.topicListStore.isFetching,
    }
}
export default connect(select)(TopicListScene);