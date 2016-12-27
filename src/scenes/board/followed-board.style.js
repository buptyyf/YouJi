import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boards: {
        flex: 1
    },
    boardCell: {
        height: 40,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    boardText: {
        fontSize: 16,
        color: "#000",
        marginLeft: 10
    },
    followedBtn: {
        height: 20,
        width: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B0B0B0',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    followedText: {
        fontSize: 12,
        color: "#B0B0B0",
    },
    topicNumText: {
        fontSize: 10,
        color: "#333333",
        marginLeft: 10,
    }
});

export default styles;