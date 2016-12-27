import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import Styles from './followed-board.style';
import { BoardActions } from '../../actions/boardAction';
import { TopicListActions } from '../../actions/topicListAction';
import { Actions } from 'react-native-router-flux';
import { Line } from '../../base-components';

// const icon = {
//     comment: require('../../../../../../assets/icn_mine_huifu.png'),
//     board: require('../../../../../../assets/icn_mine_group.png'),
// };
export class FollowedBoardScene extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        //console.warn(this.props);
        this.props.dispatch(BoardActions.getFollowedBoardList());
    }

    goToBoard(boardName, boardDescription) {
        this.props.dispatch(TopicListActions.getTopicList(boardName, {page: 1, count: 10}));
        //帖子列表也
        Actions.TopicListScene({boardDescription: boardDescription});
    }
    handleFollowBoard(boardName) {
        this.props.dispatch(BoardActions.followBoard(boardName));
        this.props.dispatch(BoardActions.getFollowedBoardList());
    }
    handleCancelFollowBoard(boardName) {
        this.props.dispatch(BoardActions.cancelFollowBoard(boardName));
        this.props.dispatch(BoardActions.getFollowedBoardList());
    }
    
    boardListRender() {
        //console.log("hot-topic topTenList: ", this.props.topTenList)
        return this.props.followedBoardList.map((board, index)=>{
            return(
                <TouchableHighlight onPress={this.goToBoard.bind(this, board.name, board.description)}
                    key={index} underlayColor="#fff" >
                    <View>
                        <View style={Styles.boardCell}>
                            <Text style={Styles.boardText}>{board.description}</Text>
                            <Text style={Styles.topicNumText}>(今日新帖:{board.threads_today_count})</Text>
                            <TouchableWithoutFeedback onPress={() => this.handleCancelFollowBoard(board.name)}>
                                <View style={Styles.followedBtn}>
                                    <Text style={Styles.followedText}>已收藏</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <Line width={1}/>
                    </View>
                </TouchableHighlight>
            );
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
                                this.props.dispatch(BoardActions.getFollowedBoardList());
                            } }
                            />
                    } >
                    {this.boardListRender()}
                </ScrollView>
            </View>
        )
    }
}

function select(store){
    //console.warn(store.topicListStore);
    return {
        followedBoardList: store.boardStore.followedBoardList,
        isFetching: store.boardStore.isFetching,
    }
}
export default connect(select)(FollowedBoardScene);