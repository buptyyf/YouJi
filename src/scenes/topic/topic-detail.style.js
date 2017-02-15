import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

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
    
    blurArea: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //opacity: 0.1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    clickArea: {
        flexDirection: "row",
        flexWrap: 'wrap',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(235, 235, 235, 1)',
        padding: 10,
        //zIndex: 30
    },
    tipArea: {
        marginLeft: 10,
        marginRight: 10,
    },
    imgArea: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipImage: {
        width: 40,
        height: 40,
    },
    tipNameArea: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipNameText: {
        fontSize: 12,
        color: "#999"
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