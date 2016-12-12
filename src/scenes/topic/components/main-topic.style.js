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
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    userId: {
        fontSize: 18,
    },
    
    body: {
        paddingLeft: 12,
        paddingBottom: 12,
        paddingRight: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 18,
    },

    sectionHeader: {
    },
    sectionText: {
        fontSize: 18,
        color: "#FF1613",
    },

});

export default styles;