import Search from '../components/Search'
import Toast from '../components/Toast'
import { isInsLink } from '../utils'
import store from '../store'


export default store.connect((
  { text, buttonLoading },
  {
    onTextChange, fetchImage, setButtonLoading, debug,
  },
) =>
  ({
    text,
    loading: buttonLoading,
    onTextChange,
    fetch: () => {
      if (!isInsLink(text)) {
        Toast.danger('Make sure the Instagram link is right!')
        return
      }
      setButtonLoading(true)
      fetchImage()
    },
    debug,
  }))(Search)
