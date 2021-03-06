
import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
let cell_w = Dimensions.get('window').width;
let styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    bgColor: {
        backgroundColor: '#F5FCFF'
    },
    mgt5: {
        marginTop: 5,
    },
    mgb5: {
        marginBottom: 5,
    },
    pdt5: {
        paddingTop: 5,
    },
    pdb5: {
        paddingBottom: 5,
    },
    textCenter: {
        textAlign: 'center',
        flex: 1,
    },
    textAli: {
        textAlign: 'right',
    },
    navbar: {
        flexDirection: 'row',
        borderBottomColor: '#fedd00',
        marginTop: 0,
        backgroundColor: '#fedd00'
        //borderBottomWidth: 1/PixelRatio.get(),
    },
    justAlign: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    viewList: {
        padding: 10,
        fontSize: 15,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    }
    
});
export default styles;
