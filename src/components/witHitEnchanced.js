import React from 'react'
import { TouchableOpacity } from 'react-native'
import { getDisplayName } from '../utils'


const witHitEnchanced = (BaseComponent) => {
  const WitHitEnchanced = ({
    hitSlop = {
      left: 10, right: 10, top: 10, bottom: 10,
    },
    onPress,
    ...others
  }) =>
    (
      <TouchableOpacity
        onPress={onPress}
        hitSlop={hitSlop}
      >
        <BaseComponent {...others} />
      </TouchableOpacity>
    )

  witHitEnchanced.displayName = `witHitEnchanced(${getDisplayName(BaseComponent)})`
  return WitHitEnchanced
}

export default witHitEnchanced
