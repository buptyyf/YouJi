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
        backgroundColor: "#ffffff",
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

    nonetworkText: {
        marginTop: 30,
        color: "#999",
        fontSize: 16,
    },
    listViewFooter: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
    },
    nodata: {
        alignItems: "center",
        marginTop: 150,
    },
    nodataText: {
        marginTop: 10,
        color: "#999",
        fontSize: 16,
    },

    footerText: {
        textAlign: "center",
        color: "#aaa",
    }
});

export default styles;