import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    titleArea: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleText: {
        fontSize: 20,
        lineHeight: 23,
        color: "#333333",
        fontWeight: "500",
        marginBottom: 10,
    },
    titleBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    postTime: {
        fontSize: 13,
        color: "#666666",
    },
    boardName: {
        fontSize: 13,
        color: "#4A90E2",
    },
    bottom: {
        backgroundColor: "#ffffff",
        height: 50,
        width: width,
        position: "absolute",
        bottom: 0,
    }
});

export default styles;