import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#fff",
    },

    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    tabItem: {
        flexDirection: "column",
        alignItems: "center",
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: "#ffd600",
        position: "absolute",
        right: 0,
        top: 4,
    },

    tabIcon: {
        width: 30,
        height: 30,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: 'contain',
    },

    tabText: {
        fontSize: 10,
        color: "#999",
    },
});

export default styles;