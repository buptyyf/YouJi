import * as React from 'react'
import { View, ViewStyle } from 'react-native'

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
export default class Line extends React.Component<lineProps, {}> {
    static defaultProps = {
        width: 0.5,
        color: '#f2f2f2',
        type: 'solid',  //'solid' | 'dotted' | 'dashed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        vertical: false,
    }
    static propTypes = {
        width: React.PropTypes.number,
        color: React.PropTypes.string,
        type: React.PropTypes.oneOf(['solid', 'dotted', 'dashed']),
        left: React.PropTypes.number,
        right: React.PropTypes.number,
        top: React.PropTypes.number,
        bottom: React.PropTypes.number,
        vertical: React.PropTypes.bool,
    }
    render() {
        const props = this.props;
        let style = {
            marginLeft: props.left,
            marginRight: props.right,
            marginTop: props.top,
            marginBottom: props.bottom,
            borderStyle: props.type,
        }, lineStyle;
        if (props.vertical) {
            lineStyle = [style, {
                borderLeftWidth: props.width,
                borderLeftColor: props.color,
            }];
        } else {
            lineStyle = [style, {
                borderBottomWidth: props.width,
                borderBottomColor: props.color,
            }];
        }

        return <View style={[lineStyle, this.props.style]} />
    }
}
