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