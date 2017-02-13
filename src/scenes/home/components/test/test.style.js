'use strict';
/**
 * @class 
 * @desc login
 * */
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
let cell_w = Dimensions.get('window').width;
let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    loginWrap: {
        backgroundColor: '#FCE9D4',
    },

    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex:1,
    },
    loginMainCon: {
        position: 'absolute', 
        top: 110,
        left: (cell_w-320)/2,
        backgroundColor: '#fff',
        height: 300,
        borderRadius: 20,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },
    logoImg: {
        position: 'absolute', 
        top:0,
        left: cell_w/7,
        width:cell_w/7*5,
        resizeMode: 'contain',
    },
    formStyle: {
        backgroundColor:'#F4F3F3',
        marginTop: 30,
        marginLeft: 10,
        width: 300,
        height: 120,
        borderRadius: 8,
    },
    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 30,
        borderColor: '#000',
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },
    forget: {
        //alignItems: 'flex-end',
        flexDirection:'row',
        margin: 20
      
    },
    btn: {
        flexDirection:'row',
        //backgroundColor:'transparent',
    },

    btnWrap:{
        flexDirection:'row',
        marginTop: 130,
        borderRadius: 5,
        backgroundColor:'transparent',
    },
  
    loginBtn1: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: 'transparent',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#fff',
        paddingTop: 15,
        marginRight: 20,
        flex: 1,
        textAlign: 'center',
      },
    loginBtn2: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: 'transparent',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#fff',
        paddingTop: 15,
        flex: 1,
        textAlign: 'center',
    },
    cellLabel: {
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        height: 24,
        borderRadius: 12,
        marginRight: 3,
        marginLeft: 4,
        flex: 1
    },
    labelWords: {
        fontSize: 20,
        color: '#666666'
    }
      
})

export default styles;
