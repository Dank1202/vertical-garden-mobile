import React, { useContext } from 'react'
import { Pressable, ScrollView, Text, View, Image } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { SliderContext } from '../Context/SiderContext'

import { FontAwesome6 } from '@expo/vector-icons'
import CareManagement from './CareManagement'

function SliderStackScreen() {
  const navigation = useNavigation()
  const { currentSliderItem, setCurrentSliderItem } = useContext(SliderContext)

  return (
    <ScrollView
      style={{
        flex: 1,
        marginHorizontal: 0,
      }}
    >
      <View>
        {/* <Pressable
          onPress={() => navigation.navigate('HomeStack')}
          style={{
            position: 'relative',
            marginBottom: 8,
          }}
        >
          <FontAwesome6 name='arrow-left' size={28} color='black' />
        </Pressable> */}
        <Image
          source={{ uri: currentSliderItem.image }}
          style={{
            width: '100%',
            height: 622,
            marginTop: 0,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            marginTop: -18,
            paddingTop: 12,
            paddingHorizontal: 16,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
          }}
        >
          <Text style={{ marginTop: 0, fontSize: 36, fontWeight: '700' }}>
            {currentSliderItem.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'gray',
              marginLeft: 8,
            }}
          >
            {currentSliderItem.date}
          </Text>
          <Text
            style={{
              margin: 10,
            }}
          >
            {currentSliderItem.description}
          </Text>
          <Text
            style={{
              margin: 10,
            }}
          >
            {currentSliderItem.irrigation}
          </Text>
          <CareManagement 
            name={'Light'}
            description={currentSliderItem.additional_care.light}
            icon={'sun'}
          />
          <CareManagement 
            name={'Temperature'}
            description={currentSliderItem.additional_care.temperature}
            icon={'thermometer'}
          />
          <CareManagement 
            name={'Other'}
            description={currentSliderItem.additional_care.other}
            icon={'menu'}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default SliderStackScreen
