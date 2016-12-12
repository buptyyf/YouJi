import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native'
import {connect} from 'react-redux';
import Styles from './hot-topic.style'
import { TopicActions } from '../../../../actions/topicAction'

export class RecommandScene extends Component {

    dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    })
    componentWillMount() {
        this.props.dispatch(TopicActions.topTenList());
    }
    componentWillReceiveProps(nextProps) {
        
    }

    renderRow(item, sectionID, rowID) {
        let titleStyle = [Styles.title, item.title.length > 20 ? { marginBottom: 7, lineHeight: 24 } : {}]
        let contentStyle = [Styles.content, item.title.length > 20 ? { marginBottom: 12, paddingTop: 3 } : {}]
        return (
            <TouchableHighlight underlayColor="#F2F2F2"
                onPress={this.handleGoOnEdit.bind(this, item.topic_id)}
                style={{ backgroundColor: 'white' }}>
                <View style={contentStyle}>
                    <Text style={titleStyle}>{item.title}</Text>
                    <Text style={Styles.update}>更新至{item.floor_num}楼</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const { data, netinfo } = this.props
        let noNetwork = (
            <View style={Styles.nodata}>
                <Text style={Styles.nonetworkText}>网络异常，请检查</Text>
            </View>
        )
        let normalRender = (
            <ListView
                initialListSize={10}
                dataSource={this.dataSource}
                renderRow={(item, sectionID, rowID) =>
                    this.renderRow(item, sectionID, rowID)}
                />
        )
        return (
            <View style={Styles.wrapper}>
                {normalRender}
            </View>
        )
    }
}

function select(store){
  return {
    topicList: store.topicListStore.topicList,
    status: store.topicListStore.status,
  }
}
export default connect(select)(RecommandScene)