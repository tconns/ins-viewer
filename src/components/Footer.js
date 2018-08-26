import React from 'react'
import { View, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { color } from '../config'


const CustomButton = ({ backgroundColor, alignSelf, ...others }) => (
  <Button
    {...others}


    buttonStyle={{
      height: 45,
      width: 100,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 25,
      backgroundColor,
    }}
    titleStyle={{
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }}
    loadingProps={{
      size: 'small',
      color: '#fff',
    }}
  />
)


const Footer = ({
  showFooter, setCanSelect, download, downloading,
}) =>
  (showFooter ?
    (

      <View style={{
          position: 'absolute',
          bottom: 0,
          borderWidth: 1,
          borderColor: '#f2f2f2',
          backgroundColor: '#fff',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 55,
          width: Dimensions.get('window').width,
        }}
      >
        <View
          style={{
            height: 45,
            marginRight: 10,
          }}
        >
          <CustomButton
            title="cancel"
            backgroundColor={color.danger}
            onPress={setCanSelect}
          />
        </View>
        <View
          style={{
            height: 45,
            marginLeft: 10,
          }}
        >
          <CustomButton
            loading={downloading}
            title="download"
            backgroundColor={color.primary}
            onPress={download}
          />
        </View>
      </View>
    ) :
    null)


export default Footer
