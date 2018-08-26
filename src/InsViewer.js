/* eslint-disable react/no-unused-state, react/prop-types, no-shadow */
import React from 'react'
import {
  Clipboard,
  ScrollView, AppState, Dimensions, View,
} from 'react-native'
import { Overlay } from 'react-native-elements'
import { Root } from 'native-base'
import Gallery from './containers/Gallery'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Search from './containers/Search'
// import Sidebar from './containers/Sidebar'
import store from './store'
import { select, isInsLink } from './utils'


const { connect } = store


let InsViewer = class InsViewer extends React.Component {
  state = {
    isOpen: false,
  }
  windowDimension = Dimensions.get('window')


  componentDidMount() {
    const { onTextChange } = this.props
    this.getContent().then(onTextChange)
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    const { onTextChange, text } = this.props
    if (nextAppState === 'active') {
      this.getContent().then(str => (str !== text) && onTextChange(str))
    }
  }
  getContent = async () => {
    const content = await Clipboard.getString()
    return content
  }
  toogleSidebar = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  };


  render() {
    const { overlayVisible, setOverlayVisible, displayUri } = this.props
    return (
      <Root>
        <View
          style={{
                position: 'relative',
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width,
                backgroundColor: '#fff',
              }}
        >
          {/* <Sidebar
            onClose={this.toogleSidebar}
            isOpen={this.state.isOpen}
          /> */}
          <Header />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 55 }}
          >
            <Search />
            <Gallery />
          </ScrollView>
          <Footer />
          <Overlay
            width={this.windowDimension.width}
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
          >
            {displayUri}
          </Overlay>
        </View>
      </Root>
    )
  }
}

InsViewer = connect((
  state,
  {
    onTextChange, setOverlayVisible, fetchImage, setButtonLoading,
  },
) => ({
  ...select(['text', 'overlayVisible', 'displayUri'])(state),
  setOverlayVisible,
  onTextChange: (text) => {
    if (!isInsLink(text)) {
      return
    }
    setButtonLoading(true)
    onTextChange(text)
    if (isInsLink(text)) {
      fetchImage(text)
    }
  },
}))(InsViewer)


export default () => <InsViewer />
