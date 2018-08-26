import React from 'react'
import { AppLoading, AdMobRewarded, Permissions } from 'expo'
import InsViewer from './src/InsViewer'
import store from './src/store'

const { Provider } = store


let App = class extends React.Component {
  state = {
    isReady: false,
  }

  init = async () => {
    const { setCameraRollPermission } = this.props
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      const res = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      setCameraRollPermission(res.status === 'granted')
    } else {
      setCameraRollPermission(true)
    }
    return true
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners()
  }


  render() {
    const { isReady } = this.state
    return (
      isReady ?
        <InsViewer /> :
        <AppLoading
          startAsync={this.init}
          onFinish={() =>
            this.setState({ isReady: true })
          }
        />
    )
  }
}

App = store.connect((_, { setCameraRollPermission }) => ({
  setCameraRollPermission,
}))(App)

export default () => <Provider><App /></Provider>
