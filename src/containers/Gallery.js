import { Dimensions } from 'react-native'
import Gallery from '../components/Gallery'
import store from '../store'

const GalleryControl = store.connect((
  {
    uris, canSelect, selectedUris,
  },
  {
    debug, setOverlayVisible, setDisplayUri, addSelectedUri,
    removeSelectedUri,
  },
) => {
  const { width } = Dimensions.get('window')
  const imageWidth = (width - 2) / 3
  const imageDimension = { width: imageWidth, height: imageWidth }
  return {
    uris,
    imageDimension,
    canSelect,
    selectedUris,
    debug,
    setOverlayVisible,
    setDisplayUri,
    addSelectedUri,
    removeSelectedUri,
  }
})(Gallery)


export default GalleryControl
