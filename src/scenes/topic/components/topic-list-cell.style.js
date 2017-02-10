import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
        //lineHeight: 12,
    },
    middle:{
        marginTop: 10,
        marginBottom: 10,
    },
    middleText: {
        color: "#333333",
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "300",
    },
    bottom:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    bottomLeftText: {
        textAlign: "left",
        color: "#999999",
        fontSize: 12,
        //lineHeight: 12,
    },
    bottomRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    Avatar: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        marginRight: 5,
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
    },

});

export default styles;