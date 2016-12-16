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
        paddingTop: 12,
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
    postTime: {
        marginTop: 5,
        fontSize: 13,
        color: "#666666",
    },
    userId: {
        fontSize: 18,
    },
    body: {
        paddingLeft: 40,
    },
});

export default styles;