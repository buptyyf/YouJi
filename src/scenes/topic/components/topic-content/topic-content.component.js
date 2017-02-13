import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image} from 'react-native'
import {connect} from 'react-redux';
import Styles from './topic-content.style';
import { Line, Narbar, DATE, getTry, roughDate } from '../../../../base-components';
import config from '../../../../config';
import { NetworkAction } from '../../../../actions/networkAction';

export class TopicContent extends Component {

    static propTypes = {
        article: React.PropTypes.object.isRequired,
        source: React.PropTypes.oneOf(['main', 'reply'])
    }
    contentArr = [];//最终用来渲染的对象数组

    componentWillMount() {
        //this.props.dispatch(TopicActions.topTenList());
        const { article } = this.props;
        console.log(article)
        /** 进行数据清洗 **/
        //去掉末尾的" －－ "
        let content = article.content.replace(/\s+\-\-\s+/g, "");
        content = content.replace(/(\[(size|color|face|url)\=.*?\])|(\[\/(size|color|face|b|url)?\])|(\[(b|em\d*)\])/g, "");
        let files = article.attachment.file;
        //处理图片在text中,形如[img=.....][/img]
        content = content.replace(/img/ig, "upload");
        //处理上传的文件和图片
        //console.log(content);
        let contents = content.split(/\[upload\=(.*?)\]\[\/upload\]/);
        //console.log(contents);
        contents.map((item, index) => {
            if(item.search(/^http.*\.(jpg|png|gif|jpeg)$/i) !== -1) { //文章中img的图片
                //console.log("文中自带的图片！", item);
                this.contentArr.push({type: "image", content: item});
            } else if(item.search(/^\d+$/) !== -1) { //上传的图片、视频、文件
                //console.log(+item - 1);
                let file = files[+item - 1];
                //console.log(file)
                if(file) { //安全保护
                    if (file.name.match(/.*\.(jpg|png|gif|jpeg)/i)) {
                        /* 图片 */
                        console.log("push image");
                        this.contentArr.push({type: "image", content: file.url});
                    } else if(file.name.match(/.*\.(avi|rmvb|mp4|mpg)/i)) {
                        /* 视频 */
                        this.contentArr.push({type: "video", content: file});
                    } else {
                        /* 文件 */
                        this.contentArr.push({type: "file", content: file});
                    }
                } else {
                    this.contentArr.push({type: "text", content: item});
                }
            } else { //是文字的话 text可承载最大字符长度10641
                if(item.length > 10000) {
                    for(let num = 0; item.substr(num, num + 10000).length > 0; num += 10000) {
                        this.contentArr.push({type: "text", content: item.substr(num, num + 10000)})
                    }
                } else {
                    this.contentArr.push({type: "text", content: item});
                }
            }
        });
    }
    
    componentWillUnmount() {
        this.contentArr = [];
        console.log("componentWillUnMount")
    }

    renderContent() {
        //console.log(this.contentArr)
        return this.contentArr.map((contentObj, index) => {
            switch (contentObj.type) {
                case "text":
                    //TODO 表情的处理
                    //console.log(contentObj.content)
                    return (
                        <View style={Styles.contentTextPart} key={index}>
                            <Text style={Styles.contentText} selectable={true}>{contentObj.content}</Text>
                        </View>
                    );
                case "image":
                    return (
                        <View style={Styles.contentImagePart} key={index}>
                            <Image source={{uri: contentObj.content + "?oauth_token=" + NetworkAction.oauth_token}}
                             style={this.props.source === "main" ? Styles.contentImage : Styles.replyContentImage}/>
                        </View>
                    );
                case "video":
                    return (
                        <View style={Styles.contentVideoPart} key={index}>
                        </View>
                    );
                case "file":
                    return (
                        <View style={Styles.contentFilePart} key={index}>
                        </View>
                    );
                default:
                    break;
            }
        });
    }

    render() {
        
        return (
            <View style={Styles.container}>
                <View style={Styles.body}>
                    {this.renderContent()}
                </View>
                <View style={Styles.bottom}></View>
            </View>
        )
    }
}
