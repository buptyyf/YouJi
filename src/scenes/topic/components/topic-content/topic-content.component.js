import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image, TouchableWithoutFeedback, Modal} from 'react-native'
import {connect} from 'react-redux';
import Styles from './topic-content.style';
import { Line, Narbar, DATE, getTry, roughDate, STATIC } from '../../../../base-components';
import config from '../../../../config';
import { NetworkAction } from '../../../../actions/networkAction';

import ImageViewer from 'react-native-image-zoom-viewer';

export class TopicContent extends Component {

    static propTypes = {
        article: React.PropTypes.object.isRequired,
        source: React.PropTypes.oneOf(['main', 'reply'])
    }
    constructor(props) {
        super(props);
        this.contentArr = [];//最终用来渲染的对象数组
        this.imageArr = [];
    }
    
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
        console.log(contents);
        contents.map((item, index) => {
            if(item.search(/^http.*\.(jpg|png|gif|jpeg)$/i) !== -1) { //文章中img的图片
                //console.log("文中自带的图片！", item);
                this.contentArr.push({type: "image", content: item});
            } else if(item.search(/^\d+$/) !== -1) { //上传的图片、视频、文件
                //console.log(+item - 1);
                let file = files.splice(+item - 1, 1);
                //console.log(file)
                if(file) { //安全保护
                    this.pushFileToContentArr(file);
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
        //处理files中剩余的图片等内容
        files.map((file, index) => {
            this.pushFileToContentArr(file)
        })

    }
    
    pushFileToContentArr(file) {
        if(file.name) {
            let oauthToken = NetworkAction.oauth_token;
            if (file.name.match(/.*\.(jpg|png|gif|jpeg)/i)) {
                /* 图片 */
                console.log("push image");
                this.contentArr.push({type: "image", content: file.thumbnail_middle + "?oauth_token=" + oauthToken});
                this.imageArr.push({url: file.url + "?oauth_token=" + oauthToken})
            } else if(file.name.match(/.*\.(avi|rmvb|mp4|mpg)/i)) {
                /* 视频 */
                this.contentArr.push({type: "video", content: file});
            } else {
                /* 文件 */
                this.contentArr.push({type: "file", content: file});
            }
        }
    }

    componentWillUnmount() {
        this.contentArr = [];
        console.log("componentWillUnMount")
    }

    renderContent() {
        //console.log(this.contentArr)
        let imgIndex = 0
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
                        <TouchableWithoutFeedback style={Styles.contentImagePart}
                            key={index}
                            onPress={this.renderImageViewer.bind(this, imgIndex++)}>
                            <Image source={{uri: contentObj.content}} 
                             style={this.props.source === "main" ? Styles.contentImage : Styles.replyContentImage}/>
                        </TouchableWithoutFeedback>
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
    renderImageViewer(index) {
        console.log("renderImageViewer", index, this.imageArr)
        return (
            <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                <ImageViewer imageUrls={this.imageArr} index={index}/>
            </View>
        )
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
