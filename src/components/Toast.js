import { Toast } from 'native-base'
import { color } from '../config'

const show = color => message => Toast.show({ //eslint-disable-line
  text: message,
  position: 'top',
  style: {
    backgroundColor: '#fff',
    width: 250,
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: color,
    borderRadius: 200,
  },
  textStyle: {
    textAlign: 'center',
    color,
  },
})

export default {
  success: show(color.success),
  danger: show(color.danger),
  warning: show(color.warning),
}
