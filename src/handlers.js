import Download from './components/Download'
import Toast from './components/Toast'
import { htmlToData, find, merge, unique } from './utils'
import * as actions from './actions'

const set =
key =>
  value =>
    dispatch =>
      dispatch(() => ({ [key]: value }))


export const onTextChange = set('text')
export const setButtonLoading = set('buttonLoading')
export const setDownloading = set('downloading')
export const setOverlayVisible = set('overlayVisible')
export const setDisplayUri = set('displayUri')
export const setCameraRollPermission = set('hasCameraRollPermission')


export const setCanSelect = () => dispatch => dispatch(actions.setCanSelect)

export const fetchImage = link => async (dispatch, { text }) => {
  let url = link
  if (!link) {
    url = text
  }
  const res = await fetch(url)
  const html = await res.text()
  const data = htmlToData(html)

  // 未登陆只能获取前12条结果
  // const userLens = R.lensPath(['entry_data', 'ProfilePage', 0, 'graphql', 'user'])
  // const idLens = R.lensPath(['id'])
  // const end_cursorLens = R.lensPath(['edge_owner_to_timeline_media', 'page_info', 'end_cursor'])
  // const id = R.view(R.compose(userLens, idLens), data)
  // const end_cursor = R.view(R.compose(userLens, end_cursorLens), data)

  // if (id) {
  //   dispatch({ id })
  // }
  // if (id && end_cursor) {
  //   dispatch({ nextUrl: nextUrl(id, end_cursor) })
  // } else {
  //   dispatch({ nextUrl: '' })
  // }
  // console.log(id, end_cursor, nextUrl(id, end_cursor))

  let urls = find(['display_url', 'video_url', 'shortcode'], data)
  const { shortcode } = urls
  let uris = [...urls.display_url, ...urls.video_url]
  dispatch(actions.updateCreator({ uris, buttonLoading: false }))

  if (shortcode.length === 12) {
    const requests = shortcode.map(code =>
      fetch(`https://www.instagram.com/p/${code}/`)
        .then(res => res.text()) //eslint-disable-line
        .then(htmlToData)
        .then(data => find(['display_url', 'video_url'], data)) //eslint-disable-line
        .catch(() => ({})))


    const urlsArr = await Promise.all(requests)

    urls = urlsArr.reduce((acc, item) => merge(acc, item), urls)
    urls = unique(urls)
    uris = [...urls.display_url, ...urls.video_url]
    dispatch(actions.updateCreator({ uris }))
  }
}


export const addSelectedUri = uri =>
  dispatch =>
    dispatch(({ selectedUris }) => ({ selectedUris: [...selectedUris, uri] }))

export const removeSelectedUri = uri => dispatch => dispatch(({ selectedUris }) =>
  ({ selectedUris: selectedUris.filter(item => item !== uri) }))

export const download = uris => async (dispatch, { selectedUris }) => {
  let links = ''
  if (uris) links = uris
  else links = selectedUris

  const failureUris = await Download.download(links)
  const failureCount = failureUris.length
  if (failureCount === 0) {
    Toast.success('Success!')
    dispatch({ canSelect: false, selectedUris: [] })
  } else {
    Toast.warning(`${failureCount} photos/videos download failed, please download again.`)
    dispatch({ selectedUris: failureUris })
  }
  dispatch({
    downloading: false,
  })
}

