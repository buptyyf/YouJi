import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    
    body: {
        paddingLeft: 12,
        paddingBottom: 12,
        paddingRight: 12,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 20,
        color: "#000000",
        fontWeight: "100",
    },
    contentImage: {
        resizeMode: "contain",
        width: width - 24,
        height: height / 2,
    },
    replyContentImage: {
        resizeMode: "contain",
        width: width - 24 - 40,
        height: height / 3,
    },
    emoticon: {
        resizeMode: "contain",
        width: 25,
        height: 25
    }

});

export default styles;