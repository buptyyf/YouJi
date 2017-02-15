import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import Styles from './remind-list.style';
import { UserActions } from '../../../actions/userAction';
import { RemindActions } from '../../../actions/remindAction';
import { TopicActions } from '../../../actions/topicAction';
import { Actions } from 'react-native-router-flux';
import { Line, Narbar, Avatar, Loading, getTry, DATE, roughDate } from '../../../base-components';

const icon = {
    reply: require('../../../../assets/icn_mine_huifu.png'),
    unReply: require('../../../../assets/icn_mine_notice.png'),
    board: require('../../../../assets/icn_mine_group.png'),
};
export class RemindListScene extends Component {
    static propTypes = {
        remindType: React.PropTypes.string.isRequired, //'at' 'reply' 'inbox' 'outbox' 'deleted', 'collection'
        remindName: React.PropTypes.string.isRequired, //"@我的文章"
        pageInfo: React.PropTypes.object.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        remindList: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        isDeletingRemind: React.PropTypes.bool.isRequired,
        deleteRemindSuccess: React.PropTypes.bool.isRequired,
    }

    constructor(props){
        super(props);
        //console.log("RemindListScene!!!!")
        this.state = {
            isCollection: props.remindType === "collection" ? true : false,
            isMailInfo: (props.remindType === 'at' || props.remindType === 'reply' || props.remindType === "collection") ? false : true,
            isBlur: false,
            readyDeleteId: 0
        }
    }
    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    componentWillMount() {
        //console.warn(this.props);
        //this.props.dispatch(TopicListActions.topTenList());
    }
    componentWillReceiveProps(nextProps) {
        let {dispatch, remindType, isDeletingRemind} = this.props;
        if(this.props.remindList !== nextProps.remindList) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.remindList);
        }

        //优化，可以在reducer中直接得出remindList的新值而不用在进行网络请求
        console.log(nextProps)
        if(!nextProps.isDeletingRemind && nextProps.deleteRemindSuccess && isDeletingRemind !== nextProps.isDeletingRemind) {
            if (remindType === "at" || remindType === "reply") {
                dispatch(RemindActions.getRemindInfoAction("refer", remindType));
            } else if (remindType === "inbox" || remindType === "outbox" || remindType === "deleted") {
                dispatch(RemindActions.getRemindInfoAction("mail", remindType));
            } else if(remindType === "collection"){
                dispatch(RemindActions.getRemindInfoAction("collection"));
            }
        }
    }

    renderBlur() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {this.setState({isBlur: false})}}>
                <View style={Styles.blurArea} >
                    <View style={Styles.clickArea}>
                        <TouchableOpacity style={Styles.buttonArea}
                             onPress={() => {this.goToDeleteRemind()}}>
                            <Text style={Styles.buttonText}>删除</Text>
                        </TouchableOpacity>
                        <Line />
                        <TouchableOpacity style={Styles.buttonArea}
                             onPress={() => {this.setState({isBlur: false})}}>
                            <Text style={Styles.buttonText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    goToRemindDetail(topicId, replyId, boardName) {
        Actions.RemindDetailScene({topicId: topicId, replyId: replyId, boardName: boardName, source: 'remind', remindName: this.props.remindName});
    }

    goToMailDetail(index) {
        Actions.RemindDetailScene({mailType: this.props.remindType, index: index, source: 'mail', remindName: this.props.remindName});
    }
    goToTopicDetail(topicId, boardName) {
        Actions.TopicDetailScene({topicId: topicId, boardName: boardName});
    }

    goToDeleteRemind() {
        let {dispatch, remindType} = this.props;
        let segment = this.state.isMailInfo ? "mail" : this.state.isCollection ? "collection" : "refer";
        console.log(segment, this.state.isCollection)
        this.state.isCollection ? dispatch(RemindActions.deleteCollectedTopic(this.state.readyDeleteId)) : 
            dispatch(RemindActions.deleteRemindAction(segment, remindType, this.state.readyDeleteId))

        this.setState({isBlur: false})
    }

    
    remindListRender(remind) {
        //console.log(remind.createdTime, "isCollection:", this.state.isCollection, this.state.isMailInfo)
        let time = this.state.isMailInfo ? roughDate(remind.post_time) : 
                        this.state.isCollection ? roughDate(remind.createdTime) : 
                            roughDate(remind.time);
        //console.log(time)
        let { remindType } = this.props
        if(remind && remind.user && remind.user.id) {
            return(
                <TouchableHighlight underlayColor="#F2F2F2" style={Styles.listCell}
                    onPress={() => {
                        if(remind.pos === -1) {
                            console.warn("文章已删除")
                        } else {
                            this.state.isMailInfo ? this.goToMailDetail(remind.index) : 
                                this.state.isCollection ? this.goToTopicDetail(remind.gid, remind.bname) : 
                                    this.goToRemindDetail(remind.group_id, remind.reply_id, remind.board_name)
                    }}}
                    onLongPress={() => {
                        this.setState({
                            isBlur: true,
                            readyDeleteId: this.state.isMailInfo ? remind.index : 
                                this.state.isCollection ? remind.gid : remind.index
                        })
                    }}
                    >
                    <View>
                        <View style={Styles.top}>
                            <View style={Styles.topBetween}>
                                <Text>{remindType === 'outbox' ? "TO: " : "FROM: " }</Text>
                                <Avatar uri={remind.user.face_url} style={Styles.Avatar} size={20}/>
                                <Text style={Styles.topText}>{remind.user.id}</Text>
                            </View>
                            <View style={Styles.topBetween}>
                                <Text style={Styles.topText}>{time}</Text>
                            </View>
                        </View>
                        <View style={Styles.middle}>
                            <Text style={remind.is_read ? Styles.isReadMiddleText : Styles.middleText}>{remind.title}</Text>
                        </View>
                        {remindType === "inbox" ? (
                            <View style={Styles.bottom}>
                                <Image source={remind.is_reply ? icon.reply : icon.unReply} style={Styles.Icon}/>
                                <Text style={Styles.bottomRightText}>{remind.is_reply ? "已回信" : "暂未回信"}</Text>
                            </View>
                            ) : null}
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }
    render() {
        let {dispatch, pageInfo, remindList, isFetching, remindName, remindType, isDeletingRemind} = this.props;
        //console.log(type)
        // console.log("topicList Render", boardDescription, boardName);
        // console.log("topicList pageInfo:", pageInfo);
        console.log(remindList)
        const hasMore = pageInfo.page_current_count < pageInfo.page_all_count;
        return (
            <View style={Styles.container}>
                <Narbar title={remindName} />
                <ListView
                    initialListSize={10}
                    dataSource={this.dataSource}
                    enableEmptySections={true}
                    renderRow={(item, sectionID, rowID) => 
                            this.remindListRender(item, sectionID, rowID) 
                    }
                    renderFooter={() => {
                        return (
                            <View style={Styles.listViewFooter}>
                                {
                                    isFetching ? <Text style={Styles.footerText}>加载中...</Text>
                                        : (getTry(() => remindList.length < 1) ?
                                            <View style={Styles.nodata}>
                                                <Text style={Styles.nodataText}>无法获取数据/出错啦！</Text>
                                            </View>
                                            : <Text style={Styles.footerText}>没有更多内容</Text>)
                                }
                            </View>
                        )
                    } }
                    onEndReached={() => {
                        if (!isFetching && hasMore && remindList.length > 0) {
                            //console.log('new fetch！！！！！ ', data.page)
                            let segment = this.state.isMailInfo ? "mail" : this.state.isCollection ? "collection" : "refer";
                            dispatch(RemindActions.getRemindInfoAction(segment, remindType, { page: pageInfo.page_current_count + 1, count: 10 }));
                        }
                    } }
                    onEndReachedThreshold={10}/>
                {this.state.isBlur ? this.renderBlur() : null}
                {isDeletingRemind ? <Loading text={"正在删除..."} /> : null}
            </View>
        )
    }
}
const mapStateToProps = (store, ownProps) => {
    return {
        remindList: store.remindStore.remindList,
        remindName: store.remindStore.remindName,
        pageInfo: store.remindStore.pageInfo,
        isFetching: store.remindStore.isFetching,
        isDeletingRemind: store.remindStore.isDeletingRemind,
        deleteRemindSuccess: store.remindStore.deleteRemindSuccess,
    }
}
export default connect(mapStateToProps)(RemindListScene);