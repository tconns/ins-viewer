import createStore from 'mini-context-store'
import * as handlers from './handlers'

const initialState = {
  uris: [],
  text: '',
  debugMsg: '',
  buttonLoading: false,
  overlayVisible: false,
  displayUri: '',
  canSelect: false,
  selectedUris: [],
  downloading: false,
  next_url: '',
  hasCameraRollPermission: false,
}


export default createStore(initialState, handlers)
