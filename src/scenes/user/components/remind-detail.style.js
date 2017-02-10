import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;
let bottomHeight = 40;

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

    body: {
        flex: 1,
    },
    scrollView: {
        marginBottom: bottomHeight,
    },

    bottom: {
        backgroundColor: "#ffffff",
        height: bottomHeight,
        width: width,
        position: "absolute",
        bottom: 0,
        flexDirection: 'row',
        //justifyContent: 'space-around'
        shadowColor: "#999",
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 0.5 },
        shadowOpacity: 0.8
    },
    bottomCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomCellText: {
        color: '#000',
        fontSize: 15,
    }
});

export default styles;