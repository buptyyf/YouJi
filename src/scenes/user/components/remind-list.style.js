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
        justifyContent: "space-between",
    },
    topBetween: {
        flexDirection: "row",
        alignItems: "center",
    },
    topText: {
        color: "#999999",
        fontSize: 14,
        //lineHeight: 12,
    },
    middle:{
        marginTop: 10,
        marginBottom: 10,
    },
    middleText: {
        color: "#000",
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "400",
    },
    isReadMiddleText: {
        color: "#555555",
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "300",
    },
    bottom:{
        flexDirection: "row",
        alignItems: "center",
    },
    bottomLeftText: {
        textAlign: "left",
        color: "#999999",
        fontSize: 12,
        //lineHeight: 12,
    },
    Avatar: {
        height: 20,
        width: 20,
        marginRight: 5,
        borderRadius: 10,
    },
    Icon: {
        height: 15,
        width: 15,
        marginRight: 5,
        borderRadius: 7.5,
    },
    bottomRightText: {
        textAlign: "right",
        color: "#999999",
        fontSize: 12,
        lineHeight: 12,
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
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        //zIndex: 30
    },
    buttonArea: {
        height: 50,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        
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