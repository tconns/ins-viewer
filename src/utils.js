/* eslint-disable  no-shadow */
import SHA1 from 'crypto-js/sha1'
import { FileSystem, AdMobRewarded } from 'expo'
import Toast from './components/Toast'
import { query_id } from './config'

//  不需要分组 flexWrap: 'wrap',
export const split = (xs = []) => {
  const { length } = xs
  const result = []
  for (let i = 0; i < length; i += 3) {
    result.push(xs.slice(i, i + 3))
  }
  return result
}

export const unique = obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: [...new Set(obj[key])] }), {})


export const find = (searchingKeys, obj) => {
  const keysObj = searchingKeys.reduce((acc, key) => ({ ...acc, [key]: key }), {})
  const initialContainer =
    searchingKeys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})

  const aux = (searchingKeys, obj, container) =>
    Object.keys(obj).reduce((acc, key) => {
      if (keysObj[key]) {
        acc[key].push(obj[key])
      }
      if ((typeof obj[key] === 'object') && (obj[key] !== null)) {
        aux(key, obj[key], acc)
      }
      return acc
    }, container)

  return unique(aux(searchingKeys, obj, initialContainer))
}


export const select = (keys = []) => (object = {}) =>
  keys.reduce((acc, key) => ({ ...acc, [key]: object[key] }), {})

export const isInsLink = (link = '') => /^https:\/\/(www.)?instagram.com\/.*/.test(link)


export const htmlToData = (html) => {
  let matchStr = ''
  html.replace(
    /<script type="text\/javascript">\s*window._sharedData\s*=\s*(.*)\s*;\s*<\/script>/g,
    (_, match) => matchStr = match,
  )
  return JSON.parse(matchStr)
}


export const merge = (a, b) =>
  Object.keys(a).reduce(
    (acc, key) =>
      (key in b ?
        ({ ...acc, [key]: [...a[key], ...b[key]] }) :
        acc)
    , a,
  )

export const filename = (uri) => {
  const result = uri.split('/')
  return result[result.length - 1]
}

export const getDisplayName = BaseComponent => BaseComponent.displayName || BaseComponent.name || 'Component'

export const extension = (uri = '') => uri.substring(uri.lastIndexOf('.'), uri.indexOf('?') === -1 ? undefined : uri.indexOf('?'))

export const isVideo = (uri = '') => extension(uri) === '.mp4'

export const cache = async (uri) => {
  const ext = extension(uri)
  const path = FileSystem.cacheDirectory + SHA1(uri) + ext
  const info = await FileSystem.getInfoAsync(path)
  if (!info.exists) {
    await FileSystem.downloadAsync(uri, path)
  }
  return path
}

export const showAd = async () => {
  try {
    await AdMobRewarded.requestAdAsync()
    await AdMobRewarded.showAdAsync()
    return true
  } catch (error) {
    Toast.warning('No more AD～')
    return false
  }
}

export const nextUrl = (id, end_cursor) => `https://www.instagram.com/graphql/query/?query_id=${query_id}&variables=${encodeURIComponent(JSON.stringify({ id, first: 12, after: end_cursor }))}`
