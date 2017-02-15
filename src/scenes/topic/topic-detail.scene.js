import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, TouchableOpacity, 
    TouchableWithoutFeedback, Image, Modal, Clipboard, Alert} from 'react-native'
import {connect} from 'react-redux';
import Styles from './topic-detail.style';
// import NavigatorBar from 'react-native-navbar';
import { TopicActions } from '../../actions/topicAction';
import { RemindActions } from '../../actions/remindAction';
import { TopicListActions } from '../../actions/topicListAction';
import { UserActions } from '../../actions/userAction';
import commonStyles from '../styles/common';
import { Actions } from 'react-native-router-flux';
import { Line, Narbar, DATE, getTry, roughDate, Loading } from '../../base-components';
import { MainTopic } from './components/main-topic.component';
import { ReplyTopic } from './components/reply-topic.component';

const icon = {
    more: require('../../../assets/icon_details_more.png'),
}

const tipsArr = [
    {name: "收藏本帖", img: require('../../../assets/icn_mine_like.png')},
    {name: "复制链接", img: require('../../../assets/icon_more_url.png')},
];

export class TopicDetailScene extends Component {
    static propTypes = {
        topicId: React.PropTypes.number.isRequired,
        boardName: React.PropTypes.string.isRequired,
        //topic: React.PropTypes.object.isRequired,
        pageInfo: React.PropTypes.object.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        firstLoad: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        this.state = {
            isBlur: false
        }
    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    componentWillMount() {
        this.props.dispatch(TopicActions.topicDetail(this.props.topicId, this.props.boardName));
    }
    componentWillReceiveProps(nextProps) {
        //console.log("!!!!!!!");
        //console.log("componentWillReceiveProps:", nextProps.topic, this.props.topic);
        if(nextProps.topic) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.topic.article);
        }
    }
    backToTop() {
        if(new Date().getTime() - this.lastPressTime < 1000) {
            _listView.scrollTo({y: 0});
        }
        this.lastPressTime = new Date().getTime();
    }

    //处理收藏，复制链接等more操作
    async handleActions(name) {
        let {dispatch, boardName, topicId} = this.props;
        switch (name) {
            case "收藏本帖":
                dispatch(RemindActions.collectTopic(topicId, boardName))
                break;
            case "复制链接":
                Clipboard.setString(`http://m.byr.cn/article/${boardName}/${topicId}`);
                try {
                    Alert.alert("已复制链接" + await Clipboard.getString())
                    //let res = await Clipboard.getString();
                } catch(e) {
                    Alert.alert(e.message)
                }
                break;
            default:
                break;
        }
    }
    renderMoreTips() {
        // let {dispatch, boardName, topicId} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={() => {this.setState({isBlur: false})}}>
                <View style={Styles.blurArea} >
                    <View style={Styles.clickArea}>
                    {tipsArr.map((tip, index) => {
                        return (
                            <View style={Styles.tipArea} key={index}>
                                <TouchableOpacity style={Styles.imgArea}
                                    onPress={() => {this.handleActions(tip.name)}}>
                                    <Image source={tip.img} style={Styles.tipImage}/>
                                </TouchableOpacity>
                                <View style={Styles.tipNameArea}>
                                    <Text style={Styles.tipNameText}>{tip.name}</Text>
                                </View>
                            </View>
                        )
                    })}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    renderNavBar() {
        let {topic, dispatch} = this.props;
        let title = '帖子详情';
        return <Narbar title={title} onPress={this.backToTop.bind(this)}
                    onLeftPress={()=>{Actions.pop()}} 
                    right={<Image source={icon.more} style={{height: 30, width: 30}}/>}
                    onRightPress={() => {this.setState({isBlur: true})}}/>;
    }
    goToBoard(boardName, boardDescription) {
        this.props.dispatch(TopicListActions.getTopicList(boardName, {page: 1, count: 10}));
        Actions.TopicListScene({boardDescription: boardDescription});
    }
    renderTitle() {
        let { topic } = this.props;
        //let postTime = DATE(topic.post_time);
        if(topic) {
            let postTime = DATE(topic.post_time);
            return (
                <View style={Styles.titleArea}>
                    <Text style={Styles.titleText}>{topic.title}</Text>
                    <View style={Styles.titleBottom}>
                        <Text style={Styles.postTime}>{postTime}</Text>
                        <Text style={Styles.boardName} onPress={this.goToBoard.bind(this, topic.board_name, topic.board_description)}>{topic.board_description}</Text>
                    </View>
                </View>
            );
        }
    }

    render() {
        const { topicId, boardName, topic, dispatch, pageInfo, isFetching, firstLoad } = this.props;
        const hasMore = pageInfo.page_current_count < pageInfo.page_all_count;
        let mainUserId;
        // console.log(this.props.dispatch);
        let noNetwork = (
            <View style={Styles.nodata}>
                <Text style={Styles.nonetworkText}>网络异常，请检查</Text>
            </View>
        )
        //console.log(this.dataSource);
        return (
            <View style={Styles.container}>
                {
                    firstLoad ? <Loading /> : (
                        <View style={Styles.container}>
                            {this.renderNavBar()}
                            <ListView
                                ref={(ListView) => {_listView = ListView}}
                                initialListSize={10}
                                renderHeader={this.renderTitle.bind(this)}
                                enableEmptySections={true}
                                dataSource={this.dataSource}
                                renderRow={(item, sectionID, rowID) => {
                                    //console.warn(sectionID);
                                    if(item.is_subject) {
                                        mainUserId = item.user.id;
                                        //console.info(topic.like_articles)
                                        return (<MainTopic article={item} hotReply={topic.like_articles } source={0}/>)
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
                            {this.state.isBlur ? this.renderMoreTips() : null}
                        </View>
                    )
                }
            </View>
        )
    }
}
const mapStateToProps = (store, ownProps) => {
    //console.log("yyf,", ownProps.topicId, store.topicStore.isFetching, store.topicStore.topic);
    return {
        topic: store.topicStore.topic[ownProps.topicId],
        isFetching: store.topicStore.isFetching,
        pageInfo: store.topicStore.pageInfo,
        firstLoad: store.topicStore.firstLoad,
    }
}
export default connect(mapStateToProps)(TopicDetailScene)