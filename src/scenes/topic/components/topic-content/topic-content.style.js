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
        fontSize: 14,
        lineHeight: 20,
        color: "#000000",
        fontWeight: "100",
    },
    contentImage: {
        resizeMode: "contain",
        width: width - 24,
        height: height / 2,
    }

});

export default styles;