import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: '#F5FCFF',
        //marginTop: 20,
    },
    boardText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        color: '#333333',
    },
    boardButton: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#fff'
    },
    tabBar: {
        height: 40,
        borderWidth: 0,
        paddingTop: 0,
        paddingBottom: 0,
        //paddingLeft: 10,
        //paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    tabBarText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333333',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    tabView: {
        flex: 1
        //height: 35,
    }
});

export default styles;