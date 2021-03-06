/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, 
    ScrollView, TouchableWithoutFeedback, Platform} from 'react-native';
import { connect } from 'react-redux';
//import NavigatorBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import Styles from './board.style';

import { BoardActions } from '../../actions/boardAction';
import { TopicListActions } from '../../actions/topicListAction';
import { Line, Narbar, Loading, STATIC } from '../../base-components';
//import HomeIndexPage from './components/index-page/index-page.scene'

const sections = [
    "本站站务",
    "北邮校园",
    "学术科技",
    "信息社会",
    "人文艺术",
    "生活时尚",
    "休闲娱乐",
    "体育健身",
    "游戏对战",
    "乡亲乡爱"
];
class BoardScene extends Component {
    static propTypes = {
        isLoggedIn: React.PropTypes.bool.isRequired,
        boardList: React.PropTypes.array.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        followedBoardList: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }
    constructor(props){
        super(props);
        this.state = {
            activeSection: 0
        }
    }
    componentWillMount() {
        console.log("boardScene");
        this.props.dispatch(BoardActions.getBoardList(0));
    }
    componentWillReceiveProps(nextProps) {
        //收藏版面后刷新页面
        if(this.props.followedBoardList !== nextProps.followedBoardList) {
            this.props.dispatch(BoardActions.getBoardList(this.state.activeSection))
        }
    }
    getBoard(sectionId) {
        this.props.dispatch(BoardActions.getBoardList(sectionId));
        this.setState({activeSection: sectionId});
    }
    renderSections() {
        return sections.map((section, index) => {
            let active = this.state.activeSection === index;
            return (
                <TouchableHighlight onPress={this.getBoard.bind(this, index)}
                    key={index} underlayColor="#fff" >
                    <View style={active ? Styles.activeSectionCell : Styles.sectionCell}>
                        <Text style={active ? Styles.activeSectionText : Styles.sectionText}>{section}</Text>
                    </View>
                </TouchableHighlight>
            );
        });
    }
    goToBoard(boardName, boardDescription) {
        this.props.dispatch(TopicListActions.getTopicList(boardName, {page: 1, count: 10}));
        //TODO 帖子列表也
        Actions.TopicListScene({boardDescription: boardDescription});
    }
    handleFollowBoard(boardName) {
        this.props.dispatch(BoardActions.followBoard(boardName));
        //this.props.dispatch(BoardActions.getBoardList(this.state.activeSection));
    }
    handleCancelFollowBoard(boardName) {
        this.props.dispatch(BoardActions.cancelFollowBoard(boardName));
        //this.props.dispatch(BoardActions.getBoardList(this.state.activeSection));
    }
    renderBoards() {
        let boards = this.props.boardList;
        //console.log("asdfasdfasdf: ", boards);
        return boards.map((board, index) => {
            //console.log(index);
            return (
                <TouchableHighlight onPress={this.goToBoard.bind(this, board.name, board.description)}
                    key={index} underlayColor="#fff" >
                    <View>
                        <View style={Styles.boardCell}>
                            <View>
                                <Text style={Styles.boardText}>{board.description}</Text>
                                <Text style={Styles.topicNumText}>(总:{board.post_all_count} 新:{board.threads_today_count})</Text>
                            </View>
                            {this.props.isLoggedIn ? (board.is_favorite ? 
                                (<TouchableWithoutFeedback onPress={() => this.handleCancelFollowBoard(board.name)}>
                                    <View style={Styles.followedBtn}>
                                        <Text style={Styles.followedText}>已收藏</Text>
                                    </View>
                                </TouchableWithoutFeedback>) : (
                                <TouchableWithoutFeedback onPress={() => this.handleFollowBoard(board.name)}>
                                    <View style={Styles.followBtn}>
                                        <Text style={Styles.followText}>收藏</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                )): null
                            }
                        </View>
                        <Line width={1}/>
                    </View>
                </TouchableHighlight>
            );
        });
    }
    render() {
        let {isFetching} = this.props;
        return (
        <View style={[Styles.container]}>
            <View style={Styles.sections}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderSections()}
                </ScrollView>
            </View>
            {isFetching ? <Loading style={{width: STATIC.WINDOW_WIDTH * 0.7}}/> : 
                <View style={Styles.boards}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.renderBoards()}
                    </ScrollView>
                </View>
            }
            
        </View>
        )

    }
}


function select(store){
  return {
      isLoggedIn: store.userStore.isLoggedIn,
      boardList: store.boardStore.boardList,
      followedBoardList: store.boardStore.followedBoardList,
      isFetching: store.boardStore.isFetching,
  }
}


export default connect(select)(BoardScene);
