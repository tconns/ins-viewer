import { CameraRoll } from 'react-native'
import { cache } from '../utils'


const download = async (uris = []) => {
  const aux = async (uris, result) => { // eslint-disable-line
    if (uris.length === 0) return result

    const urisCopy = [...uris]
    const currentUri = urisCopy.shift()
    try {
      const localPath = await cache(currentUri)
      await CameraRoll.saveToCameraRoll(localPath)
    } catch (error) {
      return aux(urisCopy, [...result, currentUri])
    }
    return aux(urisCopy, [...result, ''])
  }
  const result = await aux(uris, [])
  return result.filter(uri => uri !== '')
}


export default {
  download,
}
