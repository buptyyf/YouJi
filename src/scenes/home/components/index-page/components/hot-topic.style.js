import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    listCell: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
    },
    topText: {
        color: "#999999",
        fontSize: 12,
        lineHeight: 12,
    },
    middle:{
        marginTop: 10,
        marginBottom: 10,
    },
    middleText: {
        color: "#333333",
        fontSize: 17,
        fontWeight: "500",
    },
    bottom:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomLeftText: {
        textAlign: "left",
        color: "#999999",
        fontSize: 12,
        lineHeight: 12,
    },
    bottomRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    Icon: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
    bottomRightText: {
        textAlign: "right",
        color: "#999999",
        fontSize: 12,
        lineHeight: 12,
    }
});

export default styles;