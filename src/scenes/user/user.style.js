import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 16,
    },
    otherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    otherInfoText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333333',
    },
    body: {

    },
    centerLinkContainer:{
        "flexDirection": "row",
        "justifyContent": "space-between",
        "paddingTop": 10,
        "paddingBottom": 10,
        "paddingRight": 10,
        "paddingLeft": 10
    },
    centerLinkLeft:{
        "flexDirection": "row",
        "alignItems": "center"
    },
    centerLinkRight:{
        "flexDirection": "row",
        "alignItems": "center"
    },
    centerLinkTitle:{
        "fontSize": 16,
        "color": "#333"
    },
});

export default styles;