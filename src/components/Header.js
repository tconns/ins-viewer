import React from 'react'
import { Header, Text /* Icon */} from 'react-native-elements'
import witHitEnchanced from './witHitEnchanced'
import { color } from '../config'


const Right = witHitEnchanced(({ canSelect }) => (
  <Text
    style={{
        color: canSelect ? color.danger : color.primary,
        fontSize: 16,
        width: 52,
        fontWeight: 'bold',
      }}
  >{canSelect ? 'cancel' : 'select'}
  </Text>
))

// const Left = witHitEnchanced(() =>
//   (<Icon
//     name="menu"
//     color={color.primary}
//   />))

const InsHeader = ({ canSelect, setCanSelect /* onLeftPress */ }) => (
  <Header
    // leftComponent={<Left onPress={onLeftPress} />}
    centerComponent={{
      text: 'Ins Viewer',
      style: {
        color: color.primary,
        fontSize: 16,
        fontWeight: 'bold',
      },
    }}
    backgroundColor="#fff"
    rightComponent={
      <Right canSelect={canSelect} onPress={setCanSelect} />
      }
  />
)


export default InsHeader
