import { Alert } from 'react-native'
import Footer from '../components/Footer'
import store from '../store'


const FooterControl = store.connect((
  { selectedUris, downloading, hasCameraRollPermission },
  { setCanSelect, setDownloading, download },
) => ({
  showFooter: selectedUris.length > 0,
  hasCameraRollPermission,
  downloading,
  setCanSelect,
  download: () => {
    if (!hasCameraRollPermission) {
      Alert.alert('Allow this app to access your photos, then you can download into it.')
      return
    }
    setDownloading(true)
    download()
  },
}))(Footer)


export default FooterControl
