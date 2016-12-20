import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ViewStyle,
    StatusBar,
    Platform
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {STATUS_BAR_HEIGHT, NAVBAR_HEIGHT, DEFAULT_STYLE} from '../static'

// export interface NavBarProperty {
//     left?: JSX.Element,
//     leftExt?: JSX.Element,
//     center?: JSX.Element,
//     rightExt?: JSX.Element,
//     right?: JSX.Element,
//     title?: string,
//     titleColor?: string,
//     onLeftPress?: () => any,
//     onLeftExtPress?: () => any,
//     onRightExtPress?: () => any,
//     onRightPress?: () => any,
//     style?: ViewStyle,
// }
const sources = {
    backBlack: require('../../../assets/icon_aback_nav.png'),
}

export default class NavBar extends React.Component {
    static defaultProps = {
        style: {},
        left: <Image source={sources.backBlack} width={30} height={30}/>,
        onLeftPress: () => {Actions.pop()},
        onRightPress: () => {},
        title: '',
        titleColor: DEFAULT_STYLE.TEXT_COLOR
    }

    render() {
        let defaultStyle = Platform.OS !== 'android' ? {height: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT, paddingTop: STATUS_BAR_HEIGHT} :
                                                        {height: NAVBAR_HEIGHT}
        return (
            <View>
                <View style={{
                    backgroundColor: 'transparent',
                    height: 0
                }}>
                    {
                        Platform.OS !== 'android' &&
                        <StatusBar translucent={true}
                            backgroundColor="transparent"
                            barStyle={this.props.lightBar ? 'light-content' : 'dark-content'} />
                    }
                </View>
                <View style={[styles.container, defaultStyle, this.props.style]}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity activeOpacity={0.7}
                            style={styles.navBtn}
                            onPress={this.props.onLeftPress}>
                            {this.props.left}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleArea}>
                        {this.props.center || <Text numberOfLines={1}
                            style={[styles.titleText, { color: this.props.titleColor }]}>{this.props.title}</Text>}
                    </View>

                    <View style={styles.rightContainer}>
                        <TouchableOpacity activeOpacity={0.7}
                            style={styles.navBtnRight}
                            onPress={this.props.onRightPress}>
                            {this.props.right}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        //height: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
        //paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    navBtn: {
        paddingRight: 15,
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    navBtnRight: {
        paddingRight: 15,
        backgroundColor: 'transparent'
    },
    titleArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    titleText: {
        fontSize: 17,
        color: DEFAULT_STYLE.TEXT_COLOR,
        fontWeight: 'bold'
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 1
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    }
})
