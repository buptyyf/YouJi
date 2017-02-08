import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Easing
} from 'react-native'
import * as STATIC from '../static'

// interface PropsDefine {
//     /**
//      * style
//      */
//     style?: React.ViewStyle,
//     /**
//      * text
//      */
//     text?: string
//     /**
//      * isRunning
//      */
//     isRunning?: boolean
// }
// interface StateDefine {
//     angle?: Animated.Value
//     isRunning?: boolean
// }

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            angle: new Animated.Value(0),
            isRunning: this.props.isRunning || true
        }
        this.anim
    }

    componentDidMount() {
        if (this.state.isRunning && !this.anim) {
            this.animate()
        }
    }

    componentWillUnmount() {
        this.state.isRunning = false
    }

    componentWillReceiveProps(nextProps) {
        this.state.isRunning = nextProps.isRunning
        if (nextProps.isRunning && !this.anim) {
            this.animate()
        }
    }

    animate() {
        if (this.anim) return
        this.state.angle.setValue(0)
        this.anim = true
        Animated.timing(this.state.angle, {
            toValue: 360,
            duration: 1500,
            easing: Easing.linear
        }).start(() => {
            this.anim = false
            this.animate.bind(this)()
        })
    }

    render() {
        let {style, text} = this.props
        let loading = require('../../../assets/loadingb.png')
        if (!text) {
            text = '加载中...'
        }
        return (
            <View style={[styles.container, style]}>
                <Animated.Image
                    style={[styles.image, {
                        transform: [{
                            rotate: this.state.angle.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg']
                            })
                        }],
                    }]}
                    source={loading}/>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: STATIC.WINDOW_WIDTH,
        height: STATIC.WINDOW_HEIGHT,
        backgroundColor: '#F2F2F2',
        opacity: 0.5
    },
    image: {
        width: 62,
        height: 62
    },
    text: {
        marginTop: 20,
        color: '#B3B3B3',
        fontSize: 14
    }
})
