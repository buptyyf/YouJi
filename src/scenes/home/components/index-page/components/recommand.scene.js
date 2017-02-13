import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, WebView, TouchableHighlight, Image, RefreshControl} from 'react-native'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { TopicListScene } from '../../../../topic/topic-list.scene';
import { TopicListActions } from '../../../../../actions/topicListAction';
import { Line } from '../../../../../base-components';
import Styles from './recommand.style';
import { TopicListCell } from '../../../../topic/components/topic-list-cell.component';

const icon = {
    comment: require('../../../../../../assets/icn_mine_huifu.png'),
    board: require('../../../../../../assets/icn_mine_group.png'),
};

export class RecommandScene extends Component {
    static propTypes = {
        // isFetching: React.PropTypes.bool.isRequired,
        // topicList: React.PropTypes.array.isRequired,
        // dispatch: React.PropTypes.func.isRequired,
    }
    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        this.num = 0;
        this.isTopRefreshing = true;
    }
    componentWillMount() {
        //console.warn(this.props);
        this.props.dispatch(TopicListActions.getSectionHotTopicList(this.num++));
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps,", nextProps.topicListObj)
        if(nextProps.topicListObj) {
            this.dataSource = this.dataSource.cloneWithRowsAndSections(nextProps.topicListObj);
        }
    }
    renderSectionHeader(sectionData, sectionId) {
        // console.log("sectionData", sectionData, sectionId)
        return (
            <View style={Styles.sectionHeader}>
                <Line width={1} style={{ marginBottom: 5}}/>
                <Text style={Styles.sectionText}>{sectionId}</Text>
                <Line width={1} style={{ marginTop: 5}}/>
            </View>
        );
    }
    renderRow(topic, sectionID, rowID) {
        return (<TopicListCell topic={topic}/>)
    }

    render() {
        let {dispatch, topicListObj, isFetching} = this.props;
        // console.log("topicList Render", boardDescription, boardName);
        // console.log("topicList pageInfo:", pageInfo);
        let hasMore = this.num < 10;
        return (
            <View style={Styles.container}>
                <ListView
                    initialListSize={10}
                    dataSource={this.dataSource}
                    enableEmptySections={true}
                    renderSectionHeader={(sectionData, sectionId) => this.renderSectionHeader(sectionData, sectionId)}
                    renderRow={(item, sectionID, rowID) => this.renderRow(item, sectionID, rowID)}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching && this.isTopRefreshing}
                            onRefresh={() => {
                                this.num = 0; 
                                this.isTopRefreshing = true
                                dispatch(TopicListActions.getSectionHotTopicList(this.num++));
                            } }
                            />
                    }
                    renderFooter={() => {
                        return (
                            <View style={Styles.listViewFooter}>
                                {
                                    isFetching ? <Text style={Styles.footerText}>加载中...</Text>
                                        : (JSON.stringify(topicListObj) == '{}') ?
                                            <View style={Styles.nodata}>
                                                <Text style={Styles.nodataText}>无法获取数据/出错啦！</Text>
                                            </View>
                                            : <Text style={Styles.footerText}>没有更多内容</Text>
                                }
                            </View>
                        )
                    } }
                    onEndReached={() => {
                        if (!isFetching && hasMore) {
                            this.isTopRefreshing = false;
                            dispatch(TopicListActions.getSectionHotTopicList(this.num++));
                        }
                    } }
                    onEndReachedThreshold={10}/>
            </View>
        )
    }
}

function select(store){
  return {
    topicListObj: store.topicListStore.topicListObj,
    isFetching: store.topicListStore.isFetchingSectionHotTopic,
  }
}
export default connect(select)(RecommandScene)