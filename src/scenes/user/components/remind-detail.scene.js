import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux';
import Styles from './remind-detail.style';
import { Actions } from 'react-native-router-flux';
import { UserActions } from '../../../actions/userAction';
import { TopicListActions } from '../../../actions/topicListAction';
import { MainTopic } from '../../topic/components/main-topic.component'
import { Line, Narbar, DATE, getTry, roughDate, Loading } from '../../../base-components';

export class RemindDetailScene extends Component {
    static propTypes = {
        remindName: React.PropTypes.string,
        index: React.PropTypes.number,
        mailType: React.PropTypes.string,
        topicId: React.PropTypes.number,
        replyId: React.PropTypes.number,
        boardName: React.PropTypes.string,
        source: React.PropTypes.oneOf(['mail', 'remind']),
        dispatch: React.PropTypes.func,

        remindDetail: React.PropTypes.object,
        isFetching: React.PropTypes.bool.isRequired,
    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let { source, dispatch, replyId, boardName, mailType, index } = this.props;
        if (source === 'mail') {
            dispatch(UserActions.getRemindDetailInfoAction("mail", mailType, index))
        } else {
            dispatch(UserActions.getRemindDetailInfoAction("article", boardName, replyId))
        }
    }
    renderNavBar() {
        // let title = this.props.source === 'mail' ? "信件内容" : "内容";
        return <Narbar title={this.props.remindName} onLeftPress={()=>{Actions.pop()}}/>;
    }
    goToBoard(boardName, boardDescription) {
        this.props.dispatch(TopicListActions.getTopicList(boardName, {page: 1, count: 10}));
        Actions.TopicListScene({boardDescription: boardDescription});
    }
    renderTitle() {
        let { remindDetail, source } = this.props;
        //let postTime = DATE(topic.post_time);
        if(remindDetail) {
            let postTime = DATE(remindDetail.post_time);
            return (
                <View style={Styles.titleArea}>
                    <Text style={Styles.titleText}>{remindDetail.title}</Text>
                    <View style={Styles.titleBottom}>
                        <Text style={Styles.postTime}>{postTime}</Text>
                        {source === "remind" ? 
                            <Text style={Styles.boardName} 
                                onPress={this.goToBoard.bind(this, remindDetail.board_name, remindDetail.board_description)}>
                                {remindDetail.board_description}
                            </Text> : null}
                    </View>
                </View>
            );
        }
    }

    goToTopicDetail() {
        let { topicId, boardName } = this.props;
        Actions.TopicDetailScene({topicId: topicId, boardName: boardName})
    }
    renderRemindBottom() {
        return (
            <View style={Styles.bottom}>
                <TouchableOpacity onPress={() => this.goToTopicDetail()}
                    activeOpacity={0.7}
                    style={Styles.bottomCell}>
                    <Text style={Styles.bottomCellText}>查看原帖</Text>
                </TouchableOpacity>
                <Line vertical={true} top={5} bottom={5} width={1}/>
                <TouchableOpacity onPress={() => {}}
                    activeOpacity={0.7}
                    style={Styles.bottomCell}>
                    <Text style={Styles.bottomCellText}>Todo</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { remindDetail, isFetching, source } = this.props;
        //console.log("hotReply: ", hotReply && hotReply.length !== 0 ? "true" : "false")
        //<TopicContent content={article.content}/>
        return (
            <View style={Styles.container}>
            {
                isFetching ? <Loading /> : (
                <View style={Styles.body}>
                    {this.renderNavBar()}
                    <ScrollView style={Styles.scrollView}>
                        {this.renderTitle()}
                        <MainTopic article={remindDetail} source={1}/>
                    </ScrollView>
                    {source === 'remind' ? this.renderRemindBottom() : null}
                </View>)
            }
            </View>
        )
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        isFetching: store.userStore.isFetching,
        remindDetail: store.userStore.remindDetail,
    }
}

export default connect(mapStateToProps)(RemindDetailScene)