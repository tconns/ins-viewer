import React from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const Search = ({
  text = '', loading, fetch, onTextChange, ...others
}) => (
  <View>
    <Input
      containerStyle={{
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
      }}
      inputContainerStyle={{
        borderColor: '#2089dc',
        borderWidth: 1,
        height: 45,
        borderRadius: 25,
      }}
      leftIcon={
        <Icon
          name="link"
          color="#2089dc"
        />
      }
      inputStyle={{
        color: '#2089dc',
      }}
      placeholder="Paste intagram link here"
      value={text}
      onChangeText={onTextChange}
      controlled
      {...others}
    />
    <View
      style={{
        flex: 1,
      }}
    >
      <Button
        disabled={text.trim() === ''}
        containerStyle={{
          alignSelf: 'center',
          marginBottom: 20,
        }}
        buttonStyle={{
            width: 150,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 20,
        }}
        loading={loading}
        loadingProps={{
          size: 'large',
          color: '#fff',
        }}
        title="Search"
        onPress={fetch}
      />
    </View>
  </View>)

export default Search
