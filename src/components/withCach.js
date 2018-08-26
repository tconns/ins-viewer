import React from 'react'
import { View } from 'react-native'
import { getDisplayName, cache } from '../utils'
import { color } from '../config'


const withCach = (BaseComponent) => {
  class WithCach extends React.Component {
    state = {
      loading: true,
      uri: '',
    }


    load = async (props) => {
      const { source: { uri } } = props
      const localUri = await cache(uri)
      this.setState({
        uri: localUri,
        loading: false,
      })
    }

    componentDidMount() {
      this.load(this.props)
    }

    componentDidUpdate(prevProps) {
      if (prevProps.source.uri !== this.props.source.uri) {
        this.setState({ loading: true })
        this.loading(this.props)
      }
    }


    render() {
      const { loading, uri } = this.state
      const { style } = this.props
      return loading ?
        <View style={{
          ...style,
          backgroundColor: color.grey,
        }}
        /> :
        <BaseComponent {...this.props} source={{ uri }} />
    }
  }


  WithCach.displayName = `withCach(${getDisplayName(BaseComponent)})`
  return WithCach
}


export default withCach
