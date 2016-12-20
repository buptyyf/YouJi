import * as React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import Styles from './tab-bar.style';

let _uniId = 0

// export interface TabInfo {
//     text: string
//     icon: any
//     activeIcon: any
//     showRedDot: boolean
// }
// interface PropsDefine {
//     goToPage?: (i: number) => void
//     activeTab?: number
//     tabs?: any[]
//     /** 返回true继续切换，返回false终止切换 */
//     onClick?: (i: number) => boolean
//     tabInfo: TabInfo[]
// }
// interface StateDefine {
// }
export class TabBar extends React.Component<PropsDefine, StateDefine> {
    static defaultProps = {
        onClick: () => true,
        tabInfo: []
    }
    currentIndex = 0;

    constructor(props) {
        super(props);
        this.currentIndex = this.props.activeTab;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab != this.currentIndex) {
            this.currentIndex = nextProps.activeTab;
        }
    }

    componentDidMount() {

    }

    renderTabOption(tab, i) {
        const tabInfo = this.props.tabInfo[i]
        const icon = this.props.activeTab === i ? tabInfo.activeIcon : tabInfo.icon
        return (
            <TouchableOpacity activeOpacity={1} key={i} onPress={() => {
                if (tabInfo.showRedDot) {
                    tabInfo.showRedDot = false
                    this.forceUpdate()
                }
                if (this.props.onClick(i)) {
                    this.props.goToPage(i)
                }
            } } style={Styles.tab}>
                <View style={Styles.tabItem}>
                    <Image source={icon} style={Styles.tabIcon} width={25} height={25}/>
                    <Text style={Styles.tabText}>
                        {tabInfo.text}
                    </Text>
                    {
                        tabInfo.showRedDot &&
                        <View style={Styles.dot}></View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={Styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        )
    }
}