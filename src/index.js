import {Provider} from 'react-redux'
import React, {Component} from 'react'
import configureStore from './store/index'
import Root from './root'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() =>
                {this.setState({isLoading: false})}
            )
        }
    }
    render() {
        if(this.state.isLoading) {
            return null;
        } else {
            return (
                <Provider store={this.state.store}>
                    <Root />
                </Provider>
            )
        }
  }
}
