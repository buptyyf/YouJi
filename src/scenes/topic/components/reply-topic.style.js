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
    header: {
        paddingTop: 6,
        paddingLeft: 12,
        paddingBottom: 12,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: "center",
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    headerLeftTop: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 5,
    },
    positionTime: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 1,
    },
    postTime: {
        fontSize: 13,
        color: "#666666",
        marginRight: 5,
    },
    userId: {
        fontSize: 15,
        color: "#000",
    },
    mainUser: {
        backgroundColor: "#C3BCBC",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 6,
        paddingRight: 6,
        height: 20,
        borderRadius: 10,
        marginLeft: 5,
    },
    mainUserText: {
        fontSize: 12,
    },
    body: {
        paddingLeft: 40,
    },
});

export default styles;