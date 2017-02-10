import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight,
    Image, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import Styles from './topic-list-cell.style';
import { TopicListActions } from '../../../actions/topicListAction';
import { Actions } from 'react-native-router-flux';
import { Line, Narbar, getTry } from '../../../base-components';

const icon = {
    comment: require('../../../../assets/icn_mine_huifu.png'),
    board: require('../../../../assets/icn_mine_group.png'),
};
export class TopicListCell extends Component {
    static propTypes = {
        topic: React.PropTypes.object.isRequired,
    }
    render() {
        let { topic } = this.props;
        if(topic && topic.user && topic.user.id && topic.id) {
            return(
                <TouchableHighlight underlayColor="#F2F2F2"
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
                                <Image source={{uri: topic.user.face_url}} style={Styles.Avatar}/>
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
        } else {
            return null;
        }
    }
}