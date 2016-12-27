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
        flexDirection: 'row',
        //backgroundColor: '#F5FCFF',
        //marginTop: 20,
    },
    sections: {
        width: width * 0.3,
    },
    sectionCell: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
    },
    activeSectionCell: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    sectionText: {
        fontSize: 18,
        color: "#666666",
    },
    activeSectionText: {
        fontSize: 18,
        color: "#000"
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
    followBtn: {
        height: 20,
        width: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#333333',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
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
    followText: {
        fontSize: 12,
        color: "#333333",
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