// import React from 'react'
// import { View, Dimensions, Animated } from 'react-native'
// import { Icon, Header, Text, Button } from 'react-native-elements'
// import witHitEnchanced from './witHitEnchanced'
// import { color } from '../config'
// import { showAd } from '../utils'

// const Close =
//  witHitEnchanced(() => (

//    <Icon
//      name="close"
//      color={color.primary}
//    />
//  ))
// class Siderbar extends React.PureComponent {
//   screenDimension = Dimensions.get('screen')
//   state = {
//     opacity: new Animated.Value(0),
//     zIndex: 0,
//     loading: false,
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.isOpen !== this.props.isOpen) {
//       if (this.props.isOpen) {
//         this.setState({ zIndex: 10000 })
//         Animated.timing(
//           this.state.opacity,
//           {
//             toValue: 1,
//             duration: 400,
//             useNativeDriver: true,
//           },
//         ).start(this.handleZindex)
//       } else {
//         Animated.timing(
//           this.state.opacity,
//           {
//             toValue: 0,
//             duration: 400,
//             useNativeDriver: true,
//           },
//         ).start(() => this.setState({ zIndex: 0 }))
//       }
//     }
//   }
//   requestAd = async () => {
//     this.setState({
//       loading: true,
//     })
//     await showAd()
//     this.setState({
//       loading: false,
//     })
//   }


//   render() {
//     const { onClose } = this.props
//     const { loading } = this.state
//     return (
//       <Animated.View
//         style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             backgroundColor: 'transparent',
//             width: this.screenDimension.width,
//             height: this.screenDimension.height,
//             zIndex: this.state.zIndex,
//             opacity: this.state.opacity,
//           }}
//       >
//         <Header
//           leftComponent={<Close onPress={onClose} />}
//           backgroundColor="#fff"
//         />
//         <View
//           style={{
//             paddingBottom: 35,
//             backgroundColor: '#fff',
//           }}
//         />
//         <View
//           style={{
//             backgroundColor: '#fff',
//           }}
//         />
//         <View style={{
//             height: Dimensions.get('window').height,
//             opacity: 0.95,
//             backgroundColor: '#fff',
//           }}
//         />
//       </Animated.View>

//     )
//   }
// }


// export default Siderbar
