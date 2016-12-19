import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native'
import {connect} from 'react-redux';
import Styles from './topic-detail.style';
// import NavigatorBar from 'react-native-navbar';
import { TopicActions } from '../../actions/topicAction';
import { UserActions } from '../../actions/userAction';
import commonStyles from '../styles/common';
import { Actions } from 'react-native-router-flux';
import { Line, Narbar, DATE, getTry, roughDate } from '../../base-components';
import { MainTopic } from './components/main-topic.component';
import { ReplyTopic } from './components/reply-topic.component';

export class TopicDetailScene extends Component {
    constructor(props){
        super(props);
    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    componentWillMount() {
        this.props.dispatch(TopicActions.topicDetail(this.props.topicId, this.props.boardName));
    }
    componentWillReceiveProps(nextProps) {
        //console.log("!!!!!!!");
        //console.log(nextProps.topic.article);
        if(this.props.topic.article !== nextProps.topic.article) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.topic.article);
        }
    }
    renderNavBar() {
        let {topic, dispatch} = this.props;
        let title = topic.title || '帖子详情';
        return <Narbar title={title}
                    onLeftPress={()=>{Actions.pop()}}/>;
    }

    renderTitle() {
        let { topic } = this.props;
        //let postTime = DATE(topic.post_time);
        let postTime = DATE(topic.post_time);
        return (
            <View style={Styles.titleArea}>
                <Text style={Styles.titleText}>{topic.title}</Text>
                <View style={Styles.titleBottom}>
                    <Text style={Styles.postTime}>{postTime}</Text>
                    <Text style={Styles.boardName}>{topic.board_description}</Text>
                </View>
            </View>
        );
    }

    render() {
        const { topicId, boardName, topic, dispatch, pageInfo, isFetching } = this.props;
        const hasMore = pageInfo.page_current_count < pageInfo.page_all_count;
        let mainUserId;
        // console.log(this.props.dispatch);
        let noNetwork = (
            <View style={Styles.nodata}>
                <Text style={Styles.nonetworkText}>网络异常，请检查</Text>
            </View>
        )
        console.log(this.dataSource);
        return (
            <View style={Styles.container}>
                {this.renderNavBar()}
                <ListView
                    initialListSize={10}
                    renderHeader={this.renderTitle.bind(this)}
                    dataSource={this.dataSource}
                    renderRow={(item, sectionID, rowID) => {
                        //console.warn(sectionID);
                        if(item.is_subject) {
                            mainUserId = item.user.id;
                            return (<MainTopic article={item} hotReply={topic.like_articles}/>)
                        } else {
                            return (<ReplyTopic article={item} isMainUser={mainUserId === item.user.id}/>)
                        }
                    }}
                    renderFooter={() => {
                        return (
                            <View style={Styles.listViewFooter}>
                                {
                                    isFetching ? <Text style={Styles.footerText}>加载中...</Text>
                                        : (getTry(() => topic.article.length < 1) ?
                                            <View style={Styles.nodata}>
                                                <Text style={Styles.nodataText}>无法获取数据/出错啦！</Text>
                                            </View>
                                            : <Text style={Styles.footerText}>没有更多内容</Text>)
                                }
                            </View>
                        )
                    } }
                    onEndReached={() => {
                        if (!isFetching && hasMore && topic.article.length > 0) {
                            //console.log('new fetch！！！！！ ', data.page)
                            dispatch(TopicActions.topicDetail(topicId, boardName, { page: pageInfo.page_current_count + 1 }));
                        }
                    } }
                    onEndReachedThreshold={10}/>
            </View>
        )
    }
}

function select(store){
  return {
    topic: store.topicStore.topic,
    isFetching: store.topicStore.isFetching,
    pageInfo: store.topicStore.pageInfo
  }
}
export default connect(select)(TopicDetailScene)