import * as React from 'react'
import { View, ViewStyle, Image, StyleSheet, Platform } from 'react-native'

// interface lineProps {
//     width?: number,
//     color?: string,
//     type?: 'solid' | 'dotted' | 'dashed',
//     left?: number,
//     right?: number,
//     top?: number,
//     bottom?: number,
//     vertical?: boolean,
//     style?: React.ViewStyle
// }
const icon = {
    f: require('../../../assets/icn_mine_nv_s.png'),
    m: require('../../../assets/icn_mine_nan_s.png'),
};
export default class Avatar extends React.Component {
    static defaultProps = {
        size: 100,
    }
    static propTypes = {
        size: React.PropTypes.number.isRequired,
        iconSize: React.PropTypes.number,
        gender: React.PropTypes.oneOf(['f', 'm', 'n']),
        uri: React.PropTypes.string,
    }
    render() {
        let {size, uri, gender, iconSize} = this.props;
        let avatarStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
        }
        let iconStyle = {
            width: iconSize || size / 5,
            height: iconSize || size / 5,
            borderRadius: iconSize / 2 || size / 10,
        }
        iconStyle.marginTop = -iconStyle.height 
        iconStyle.marginBottom = -iconStyle.marginTop / 2
        iconStyle.marginRight = -size + iconStyle.width
        return (
            <View style={[Styles.container, this.props.style]} >
                <Image source={{uri: uri}} 
                    style={[avatarStyle,
                         {height: size, width: size, borderRadius: size / 2}, 
                         Platform.OS === 'android' ? {overlayColor: "#fff"} : {} ]}/>
                {gender && gender !== 'n' ? <Image source={icon[gender]} style={iconStyle}/> : null}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
