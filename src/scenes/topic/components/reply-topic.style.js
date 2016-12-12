import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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