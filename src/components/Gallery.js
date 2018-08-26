import React from 'react'
import {
  View, Image, TouchableWithoutFeedback,
  ScrollView, Dimensions,
} from 'react-native'
import { Video } from 'expo'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import withCach from './withCach'
import { color } from '../config'
import { isVideo } from '../utils'

const CachedImage = withCach(Image)
const CachedVideo = withCach(Video)

class GalleryElement extends React.Component {
  windowDimension = Dimensions.get('window')
  displayHDImage = () => {
    const { setOverlayVisible, setDisplayUri, uri } = this.props
    const { windowDimension } = this
    setOverlayVisible(true)
    const image = this.element({
      source: { uri },
      resizeMode: 'contain',
      style: {
        width: windowDimension.width - 30,
        height: windowDimension.width - 30,
        flex: 1,
        alignSelf: 'center',
      },
    }, { useNativeControls: true })
    setDisplayUri(image)
  }

  element = (props, video = {}, image = {}) =>
    (isVideo(props.source.uri) ?
      <CachedVideo {...props} {...video} /> :
      <CachedImage {...props} {...image} />
    )

  renderCaption = (uri) => {
    const style = {
      position: 'absolute',
      left: 1,
      top: 1,
    }
    return (isVideo(uri) ?
      <Icon
        color={color.primary}
        style={style}
        name="video-camera"
      /> :
      <Icon
        color={color.primary}
        style={style}
        name="photo"
      />)
  }
  renderCheckbox = () => {
    const { canSelect, checked } = this.props
    return canSelect && checked ?
      (<CheckBox
        containerStyle={{
        margin: 0,
        marginRight: -1,
        opacity: 1,
        padding: 0,
        position: 'absolute',
          right: 0,
          bottom: 0,
        }}
        onIconPress={this.handlePress}
        checked
        checkedIcon="check-circle"
      />) :
      null
  }
  handlePress = () => {
    const {
      uri, canSelect, addSelectedUri, removeSelectedUri, checked,
    } = this.props

    if (canSelect) {
      return (checked ? removeSelectedUri(uri) : addSelectedUri(uri))
    }
    return this.displayHDImage()
  }
  render() {
    const {
      uri, width, height, checked, style,
    } = this.props
    const VisiableImage = this.element({
      source: { uri },
      resizeMode: 'cover',
      style: {
        flex: 1,
        width,
        height,
        opacity: checked ? 0.8 : 1,
      },
    })
    return (
      <TouchableWithoutFeedback
        // onLongPress={() => savePhoto(uri)} 在我的红米上好像有点问题
        onPress={this.handlePress}
      >
        <View style={{
          ...style,
        }}
        >
          {VisiableImage}
          {this.renderCheckbox()}
          {this.renderCaption(uri)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class Gallery extends React.Component {
   renderImages = (uris, width, height) => uris.map((uri, index) => {
     const {
       savePhoto, setOverlayVisible, setDisplayUri, canSelect,
       selectedUris, addSelectedUri, removeSelectedUri,
     } = this.props

     return (
       <GalleryElement
         key={uri}
         style={{
           position: 'relative',
           marginBottom: 1,
           marginRight: (index + 1) % 3 === 0 ? 0 : 1,
         }}
         uri={uri}
         selectedUris={selectedUris}
         savePhoto={() => savePhoto(uri)}
         setOverlayVisible={setOverlayVisible}
         setDisplayUri={setDisplayUri}
         width={width}
         height={height}
         checked={selectedUris.indexOf(uri) > -1}
         canSelect={canSelect}
         addSelectedUri={addSelectedUri}
         removeSelectedUri={removeSelectedUri}
       />
     )
   })
  renderImageGroups = () => {
    const { imageDimension, uris } = this.props
    const { width, height } = imageDimension
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {this.renderImages(uris, width, height)}

      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        {this.renderImageGroups()}
      </ScrollView>
    )
  }
}

export default Gallery
